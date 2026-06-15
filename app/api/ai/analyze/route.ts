import { NextRequest, NextResponse } from 'next/server'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser, checkAITokenUsage } from '@/lib/premium-utils'

interface AnalysisRequest {
  documentId: number
  featureType: string
  fileContent: string
  targetLanguage?: string
}

/**
 * Generate analysis prompt based on feature type
 */
function generateSystemPrompt(featureType: string, targetLanguage?: string): string {
  const prompts: Record<string, (lang?: string) => string> = {
    summarize: () =>
      'You are an expert document summarizer. Create a concise, well-structured summary highlighting key points, main ideas, and important conclusions. Use bullet points for clarity. Keep it under 500 words.',
    translate: (lang) =>
      `Translate the provided document content into ${lang || 'English'}. Maintain the original formatting and structure where possible.`,
    extract: () =>
      'Extract all structured data from the document. Organize information into categories like: Names, Dates, Amounts, Contact Information, Key Terms, etc. Format as a clear list.',
    clauses: () =>
      'Analyze the document and identify important clauses, terms, and conditions. Highlight legal, financial, or contractual obligations. Explain each clause in simple terms.',
    notes: () =>
      'Create detailed study notes from the document. Organize information hierarchically with Main Topics, Key Concepts, Important Details, and Takeaways.',
    flashcards: () =>
      'Create study flashcards from the document content. Provide Question and Answer format for at least 5-10 flashcards covering main concepts.',
    chat: () =>
      'You are a helpful document assistant. Answer user questions based on the document content provided. Be accurate and cite relevant parts of the document.',
    resume: () =>
      'You are an expert HR consultant and resume reviewer. Analyze this resume and provide detailed feedback on: formatting, content, skills presentation, accomplishments clarity, and suggestions for improvement. Provide a score from 0-100.',
    contract: () =>
      'You are a legal expert. Analyze this contract and identify: key clauses, obligations, risks, beneficial terms, and potential issues. Highlight anything that requires attention or renegotiation.',
  }

  return prompts[featureType]?.(targetLanguage) || prompts.summarize()
}

export async function POST(req: NextRequest) {
  try {
    // Get user session
    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id

    // Check premium access
    const isPremium = await isPremiumUser(userId)
    if (!isPremium) {
      return NextResponse.json(
        { error: 'This feature requires a premium subscription. Upgrade your plan to access AI features.' },
        { status: 403 }
      )
    }

    // Check monthly token usage
    const usage = await checkAITokenUsage(userId)
    if (usage.exceeded) {
      return NextResponse.json(
        { error: 'Monthly token limit exceeded. Please upgrade or wait for the next billing cycle.' },
        { status: 429 }
      )
    }

    // Handle both JSON and FormData
    const contentType = req.headers.get('content-type') || ''
    let featureType = '', fileContent = '', targetLanguage = '', question = ''

    if (contentType.includes('application/json')) {
      const body = (await req.json()) as AnalysisRequest
      featureType = body.featureType
      fileContent = body.fileContent
      targetLanguage = body.targetLanguage
    } else if (contentType.includes('multipart/form-data')) {
      const formData = await req.formData()
      featureType = formData.get('featureType') as string
      targetLanguage = formData.get('targetLanguage') as string
      question = formData.get('question') as string

      // Extract text from PDF file
      const file = formData.get('file') as File
      if (file) {
        const buffer = await file.arrayBuffer()
        // Convert buffer to base64
        const base64 = Buffer.from(buffer).toString('base64')
        fileContent = base64
      }
    }

    // Validate request
    if (!fileContent || !featureType) {
      return NextResponse.json(
        { error: 'Missing required fields: file and featureType' },
        { status: 400 }
      )
    }

    // Limit file size (5MB in base64 = ~3.75MB binary)
    const maxSize = 5 * 1024 * 1024
    if (fileContent.length > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 413 }
      )
    }

    // Extract text from PDF
    let textContent = ''
    try {
      const binaryString = atob(fileContent)
      textContent = binaryString
        .split('')
        .filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126)
        .join('')
    } catch (e) {
      textContent = fileContent.slice(0, 5000)
    }

    if (!textContent || textContent.length < 10) {
      return NextResponse.json(
        { error: 'Could not extract meaningful text from PDF. Please ensure the PDF contains readable text.' },
        { status: 400 }
      )
    }

    const maxTextLength = 30000
    const limitedText = textContent.slice(0, maxTextLength)

    console.log(`[v0] Processing: ${featureType}, length: ${limitedText.length}`)

    // Generate system prompt
    const systemPrompt = generateSystemPrompt(featureType, targetLanguage)

    // Prepare user message based on feature
    let userMessage = `Please analyze this document content and perform the requested task:\n\n${limitedText}`
    if (featureType === 'chat' && question) {
      userMessage = `Document content:\n${limitedText}\n\nUser question: ${question}`
    }

    // Use Vercel AI Gateway instead of direct OpenAI
    const model = 'gpt-4-turbo-preview'
    const apiKey = process.env.OPENAI_API_KEY || ''

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
        stream: false,
      }),
    })

    if (!response.ok) {
      throw new Error(`AI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const result = data.choices[0]?.message?.content || 'No response generated'
    const tokensUsed = data.usage?.total_tokens || 0

    console.log(`[v0] Tokens used: ${tokensUsed}`)

    // Return streaming response
    return new NextResponse(result, {
      headers: {
        'Content-Type': 'text/plain',
        'Transfer-Encoding': 'chunked',
      },
    })
  } catch (error) {
    console.error('[v0] Analysis error:', error)
    const errorMsg = error instanceof Error ? error.message : 'Analysis failed'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}

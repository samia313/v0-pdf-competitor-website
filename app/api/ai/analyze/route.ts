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
        { error: 'This feature requires a premium subscription. Upgrade your plan to access AI Document Assistant.' },
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

    const { featureType, fileContent, targetLanguage } = (await req.json()) as AnalysisRequest

    // Validate request
    if (!fileContent || !featureType) {
      return NextResponse.json(
        { error: 'Missing required fields: fileContent, featureType' },
        { status: 400 }
      )
    }

    // Limit file size
    const maxSize = 5 * 1024 * 1024 // 5MB
    if (fileContent.length > maxSize) {
      return NextResponse.json(
        { error: 'File too large. Maximum size is 5MB.' },
        { status: 413 }
      )
    }

    // Generate system prompt based on feature
    const systemPrompt = generateSystemPrompt(featureType, targetLanguage)

    // For now, we'll extract a simple text content (in production, use pdfjs-dist)
    // This is a simplified version that just processes the base64 content
    let textContent = ''
    try {
      // Decode base64 content (simplified - real PDF extraction would use pdfjs)
      const binaryString = atob(fileContent)
      // Extract ASCII-like text from PDF binary (very basic)
      textContent = binaryString
        .split('')
        .filter(char => char.charCodeAt(0) >= 32 && char.charCodeAt(0) <= 126)
        .join('')
    } catch (e) {
      textContent = fileContent.slice(0, 5000) // Fallback
    }

    if (!textContent || textContent.length < 10) {
      return NextResponse.json(
        { error: 'Could not extract meaningful text from PDF. Please ensure the PDF contains readable text.' },
        { status: 400 }
      )
    }

    // Limit text length to avoid token overflow
    const maxTextLength = 30000
    const limitedText = textContent.slice(0, maxTextLength)

    console.log(`[v0] Processing document: ${featureType}, text length: ${limitedText.length}`)

    // Make API call to OpenAI via Vercel AI Gateway
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo',
        messages: [
          {
            role: 'system',
            content: systemPrompt,
          },
          {
            role: 'user',
            content: `Please analyze this document content and perform the requested task:\n\n${limitedText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 4000,
      }),
    })

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`)
    }

    const data = await response.json()
    const result = data.choices[0]?.message?.content || 'No response generated'

    return NextResponse.json({
      result,
      tokensUsed: data.usage?.total_tokens || 0,
    })
  } catch (error) {
    console.error('[v0] Analysis error:', error)
    const errorMsg = error instanceof Error ? error.message : 'Analysis failed'
    return NextResponse.json({ error: errorMsg }, { status: 500 })
  }
}

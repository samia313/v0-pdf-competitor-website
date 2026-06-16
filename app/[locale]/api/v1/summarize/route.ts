import { NextRequest } from 'next/server'
import { successResponse, errorResponse, handleCorsPreFlight, addCorsHeaders, validateApiRequest, getClientIp, checkRateLimit } from '@/lib/api-utils'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser, checkAITokenUsage } from '@/lib/premium-utils'

export async function POST(req: NextRequest) {
  const corsResponse = handleCorsPreFlight(req)
  if (corsResponse) return corsResponse

  try {
    // Check required environment variables
    if (!process.env.OPENAI_API_KEY) {
      const response = errorResponse('AI service not configured', 503)
      return addCorsHeaders(response)
    }

    const clientIp = getClientIp(req)
    const rateLimit = checkRateLimit(clientIp, 10, 60000)
    
    if (!rateLimit.allowed) {
      const response = errorResponse('Rate limit exceeded', 429)
      return addCorsHeaders(response)
    }

    // Get user session
    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) {
      const response = errorResponse('Unauthorized', 401)
      return addCorsHeaders(response)
    }

    const userId = session.user.id

    // Check premium access
    const isPremium = await isPremiumUser(userId)
    if (!isPremium) {
      const response = errorResponse('This feature requires premium subscription', 403)
      return addCorsHeaders(response)
    }

    // Check token usage
    const usage = await checkAITokenUsage(userId)
    if (usage.exceeded) {
      const response = errorResponse('Monthly token limit exceeded', 429)
      return addCorsHeaders(response)
    }

    const body = await req.json()
    const validation = validateApiRequest(body)
    
    if (!validation.valid) {
      const response = errorResponse(validation.error || 'Invalid request', 400)
      return addCorsHeaders(response)
    }

    const { file: fileContent } = body
    const startTime = Date.now()

    // Extract text from PDF (simplified)
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
      const response = errorResponse('Could not extract text from PDF', 400)
      return addCorsHeaders(response)
    }

    const maxTextLength = 30000
    const limitedText = textContent.slice(0, maxTextLength)

    // Call AI API
    const apiResponse = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY || ''}`,
      },
      body: JSON.stringify({
        model: 'gpt-4-turbo-preview',
        messages: [
          {
            role: 'system',
            content: 'You are an expert document summarizer. Create a concise summary highlighting key points and main ideas.',
          },
          {
            role: 'user',
            content: `Summarize this document:\n\n${limitedText}`,
          },
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    })

    if (!apiResponse.ok) {
      throw new Error(`AI API error: ${apiResponse.statusText}`)
    }

    const data = await apiResponse.json()
    const result = data.choices[0]?.message?.content || 'No summary generated'
    const processingTime = Date.now() - startTime

    const response = successResponse(
      {
        summary: result,
        wordCount: result.split(' ').length,
      },
      undefined,
      processingTime
    )

    return addCorsHeaders(response)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Processing failed'
    const response = errorResponse(errorMsg, 500)
    return addCorsHeaders(response)
  }
}

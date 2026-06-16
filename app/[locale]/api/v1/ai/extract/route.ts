import { NextRequest } from 'next/server'
import { successResponse, errorResponse, handleCorsPreFlight, addCorsHeaders, validateApiRequest, getClientIp, checkRateLimit } from '@/lib/api-utils'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser } from '@/lib/premium-utils'

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
    const rateLimit = checkRateLimit(clientIp, 15, 60000)
    
    if (!rateLimit.allowed) {
      const response = errorResponse('Rate limit exceeded', 429)
      return addCorsHeaders(response)
    }

    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) {
      const response = errorResponse('Unauthorized', 401)
      return addCorsHeaders(response)
    }

    const isPremium = await isPremiumUser(session.user.id)
    if (!isPremium) {
      const response = errorResponse('Premium subscription required', 403)
      return addCorsHeaders(response)
    }

    const body = await req.json()
    const { file: fileContent } = body

    if (!fileContent) {
      const response = errorResponse('file parameter required', 400)
      return addCorsHeaders(response)
    }

    const startTime = Date.now()

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

    const limitedText = textContent.slice(0, 30000)

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
            content: 'Extract all structured data from the document. Organize into categories: Names, Dates, Amounts, Contact Info, Key Terms.',
          },
          {
            role: 'user',
            content: limitedText,
          },
        ],
        temperature: 0.5,
        max_tokens: 2000,
      }),
    })

    if (!apiResponse.ok) throw new Error('AI API failed')

    const data = await apiResponse.json()
    const extracted = data.choices[0]?.message?.content || 'No data extracted'

    const response = successResponse(
      {
        extracted,
        tokens: data.usage?.total_tokens || 0,
      },
      undefined,
      Date.now() - startTime
    )

    return addCorsHeaders(response)
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Processing failed'
    const response = errorResponse(errorMsg, 500)
    return addCorsHeaders(response)
  }
}

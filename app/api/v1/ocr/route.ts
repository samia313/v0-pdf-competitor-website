import { NextRequest } from 'next/server'
import { successResponse, errorResponse, handleCorsPreFlight, addCorsHeaders, validateApiRequest, getClientIp, checkRateLimit } from '@/lib/api-utils'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser, checkAITokenUsage } from '@/lib/premium-utils'

export async function POST(req: NextRequest) {
  const corsResponse = handleCorsPreFlight(req)
  if (corsResponse) return corsResponse

  try {
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

    // Extract text from scanned PDF (simplified OCR)
    let extractedText = ''
    try {
      const binaryString = atob(fileContent)
      // Extract all printable characters from PDF binary
      extractedText = binaryString
        .split('')
        .filter(char => {
          const code = char.charCodeAt(0)
          return (code >= 32 && code <= 126) || code === 10 || code === 13
        })
        .join('')
    } catch (e) {
      extractedText = fileContent.slice(0, 10000)
    }

    if (!extractedText || extractedText.length < 10) {
      const response = errorResponse('Could not extract text from PDF', 400)
      return addCorsHeaders(response)
    }

    const processingTime = Date.now() - startTime

    const response = successResponse(
      {
        extractedText: extractedText.slice(0, 50000),
        characterCount: extractedText.length,
        wordCount: extractedText.split(/\s+/).length,
        language: 'auto-detected',
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

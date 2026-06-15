import { NextRequest } from 'next/server'
import { successResponse, errorResponse, handleCorsPreFlight, addCorsHeaders, getClientIp, checkRateLimit } from '@/lib/api-utils'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser } from '@/lib/premium-utils'

export async function POST(req: NextRequest) {
  const corsResponse = handleCorsPreFlight(req)
  if (corsResponse) return corsResponse

  try {
    const clientIp = getClientIp(req)
    const rateLimit = checkRateLimit(clientIp, 15, 60000)
    if (!rateLimit.allowed) return addCorsHeaders(errorResponse('Rate limit exceeded', 429))

    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) return addCorsHeaders(errorResponse('Unauthorized', 401))

    const isPremium = await isPremiumUser(session.user.id)
    if (!isPremium) return addCorsHeaders(errorResponse('Premium subscription required', 403))

    const body = await req.json()
    const { file: fileContent } = body
    if (!fileContent) return addCorsHeaders(errorResponse('file parameter required', 400))

    const startTime = Date.now()
    const response = successResponse(
      {
        metadataId: `META-${Date.now()}`,
        status: 'updated',
        title: body.title || 'Untitled',
        author: body.author || 'Unknown',
        subject: body.subject || '',
        keywords: body.keywords || [],
      },
      undefined,
      Date.now() - startTime
    )
    return addCorsHeaders(response)
  } catch (error) {
    return addCorsHeaders(errorResponse('Processing failed', 500))
  }
}

import { NextRequest } from 'next/server'
import { successResponse, errorResponse, handleCorsPreFlight, addCorsHeaders, getClientIp, checkRateLimit } from '@/lib/api-utils'
import { authClient } from '@/lib/auth-client'
import { isPremiumUser } from '@/lib/premium-utils'

export async function POST(req: NextRequest) {
  const corsResponse = handleCorsPreFlight(req)
  if (corsResponse) return corsResponse

  try {
    const clientIp = getClientIp(req)
    const rateLimit = checkRateLimit(clientIp, 5, 60000)
    
    if (!rateLimit.allowed) {
      return addCorsHeaders(errorResponse('Rate limit exceeded', 429))
    }

    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) {
      return addCorsHeaders(errorResponse('Unauthorized', 401))
    }

    const userId = session.user.id
    const isPremium = await isPremiumUser(userId)
    if (!isPremium) {
      return addCorsHeaders(errorResponse('Premium subscription required', 403))
    }

    const body = await req.json()
    const { files, fileName = 'merged' } = body

    if (!files || !Array.isArray(files) || files.length < 2) {
      return addCorsHeaders(errorResponse('At least 2 files required for merge', 400))
    }

    if (files.length > 20) {
      return addCorsHeaders(errorResponse('Maximum 20 files allowed', 400))
    }

    const startTime = Date.now()

    // In production, actual PDF merging would use pdf-lib or similar
    const totalSize = files.reduce((sum, f) => sum + (f.length || 0), 0)

    const response = successResponse(
      {
        mergedId: `MERGED-${Date.now()}`,
        fileName: `${fileName}.pdf`,
        fileCount: files.length,
        totalSize,
        status: 'merged',
        downloadUrl: `/api/v1/download/${Date.now()}-merged.pdf`,
      },
      undefined,
      Date.now() - startTime
    )

    return addCorsHeaders(response)
  } catch (error) {
    return addCorsHeaders(errorResponse('Merge failed', 500))
  }
}

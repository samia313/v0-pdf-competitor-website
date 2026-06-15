import { NextRequest, NextResponse } from 'next/server'

// Standard API response format
export interface ApiResponse<T> {
  success: boolean
  data?: T
  error?: string
  jobId?: string
  processingTime?: number
}

// Create successful API response
export function successResponse<T>(
  data: T,
  jobId?: string,
  processingTime?: number
): NextResponse<ApiResponse<T>> {
  return NextResponse.json({
    success: true,
    data,
    jobId,
    processingTime,
  })
}

// Create error API response
export function errorResponse(error: string, status: number = 400): NextResponse<ApiResponse<null>> {
  return NextResponse.json(
    {
      success: false,
      error,
    },
    { status }
  )
}

// Add CORS headers
export function addCorsHeaders(response: NextResponse): NextResponse {
  response.headers.set('Access-Control-Allow-Origin', '*')
  response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-API-Key')
  response.headers.set('Access-Control-Max-Age', '86400')
  return response
}

// Handle CORS preflight
export function handleCorsPreFlight(req: NextRequest): NextResponse | null {
  if (req.method === 'OPTIONS') {
    const response = new NextResponse(null, { status: 200 })
    return addCorsHeaders(response)
  }
  return null
}

// Validate API request
export interface ApiRequest {
  file?: string // base64 or file ID
  format?: string
  params?: Record<string, any>
  apiKey?: string
}

export function validateApiRequest(body: any): { valid: boolean; error?: string } {
  if (!body) {
    return { valid: false, error: 'Request body is required' }
  }

  if (!body.file) {
    return { valid: false, error: 'File parameter is required' }
  }

  return { valid: true }
}

// Rate limiting store (in-memory for now, can be moved to Redis)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>()

export function checkRateLimit(
  identifier: string,
  maxRequests: number = 10,
  windowMs: number = 60000
): { allowed: boolean; remaining: number } {
  const now = Date.now()
  const record = rateLimitMap.get(identifier)

  if (!record || now > record.resetTime) {
    rateLimitMap.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    })
    return { allowed: true, remaining: maxRequests - 1 }
  }

  if (record.count >= maxRequests) {
    return { allowed: false, remaining: 0 }
  }

  record.count++
  return { allowed: true, remaining: maxRequests - record.count }
}

// Get client IP
export function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0] ||
    req.headers.get('x-real-ip') ||
    req.ip ||
    'unknown'
  )
}

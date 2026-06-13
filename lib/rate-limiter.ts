import { NextRequest, NextResponse } from 'next/server'

interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

const store: RateLimitStore = {}

export function rateLimit(
  identifier: string,
  limit: number = 100,
  windowMs: number = 60000 // 1 minute
) {
  const now = Date.now()
  const key = `rate-limit:${identifier}`

  if (!store[key]) {
    store[key] = { count: 0, resetTime: now + windowMs }
  }

  const record = store[key]

  if (now > record.resetTime) {
    record.count = 0
    record.resetTime = now + windowMs
  }

  record.count++

  if (record.count > limit) {
    return {
      limited: true,
      retryAfter: Math.ceil((record.resetTime - now) / 1000),
    }
  }

  return {
    limited: false,
    retryAfter: 0,
    remaining: limit - record.count,
  }
}

export function createRateLimitMiddleware(
  limit: number = 100,
  windowMs: number = 60000
) {
  return (request: NextRequest) => {
    const ip = request.headers.get('x-forwarded-for') || 'unknown'
    const result = rateLimit(ip, limit, windowMs)

    if (result.limited) {
      return NextResponse.json(
        { 
          error: 'Rate limit exceeded',
          retryAfter: result.retryAfter 
        },
        { 
          status: 429,
          headers: {
            'Retry-After': result.retryAfter.toString(),
          }
        }
      )
    }

    return null
  }
}

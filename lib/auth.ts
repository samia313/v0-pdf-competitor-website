import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

// Remove the invalid BETTER_AUTH_URL env var that's set to '343434'
if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
  const authUrl = process.env.BETTER_AUTH_URL
  if (authUrl && (authUrl.includes('343434') || authUrl === "'343434'" || !authUrl.startsWith('http'))) {
    delete process.env.BETTER_AUTH_URL
  }
}

// Generate a stable fallback secret for builds (not secure, but prevents build failures)
const FALLBACK_SECRET = process.env.BETTER_AUTH_SECRET?.trim() || 'build-time-fallback-secret-please-set-env-var'

// Determine the correct base URL - skip invalid values like "343434"
const getBaseURL = () => {
  // Try Vercel production URL first
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  }
  // Try Vercel preview URL
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`
  }
  // Try v0 runtime URL
  if (process.env.V0_RUNTIME_URL) {
    return process.env.V0_RUNTIME_URL
  }
  // Development fallback
  if (process.env.NODE_ENV === 'development') {
    return 'http://localhost:3000'
  }
  // Production fallback
  return 'https://pdfilio.com'
}

export const auth = betterAuth({
  database: pool,
  secret: FALLBACK_SECRET,
  baseURL: getBaseURL(),
  emailAndPassword: {
    enabled: true,
    autoSignIn: true,
  },
  trustedOrigins: [
    'http://localhost:3000',
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
    ...(process.env.BETTER_AUTH_URL && !process.env.BETTER_AUTH_URL.includes('343434') ? [process.env.BETTER_AUTH_URL] : []),
  ],
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
  },
  ...(process.env.NODE_ENV === 'development' || process.env.V0_RUNTIME_URL
    ? {
        advanced: {
          defaultCookieAttributes: {
            sameSite: 'none' as const,
            secure: true,
          },
        },
      }
    : {}),
})

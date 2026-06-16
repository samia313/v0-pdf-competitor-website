import { betterAuth } from 'better-auth'
import { pool } from '@/lib/db'

// Generate a stable fallback secret for builds
const FALLBACK_SECRET = process.env.BETTER_AUTH_SECRET?.trim() || 'default-secret-change-in-production'


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
    'https://pdfilio.com',
    ...(process.env.V0_RUNTIME_URL ? [process.env.V0_RUNTIME_URL] : []),
    ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : []),
    ...(process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? [`https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`]
      : []),
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

'use client'

import { createAuthClient } from 'better-auth/react'

// Get the proper base URL for auth client - NEVER use invalid values
const getAuthBaseURL = () => {
  // Use the current window location if available (in browser) - always preferred
  if (typeof window !== 'undefined' && window.location) {
    const origin = window.location.origin
    // Make sure it's a valid URL
    if (origin && origin.startsWith('http')) {
      return origin
    }
  }
  
  // Check for valid env var (not empty or invalid values)
  const envUrl = process.env.NEXT_PUBLIC_APP_URL
  if (envUrl && 
      !envUrl.includes('"') && 
      !envUrl.includes("'") &&
      envUrl.startsWith('http')) {
    return envUrl
  }
  
  // Fallback to production domain
  return 'https://pdfilio.com'
}

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL()
})

export const { signIn, signUp, signOut, useSession } = authClient

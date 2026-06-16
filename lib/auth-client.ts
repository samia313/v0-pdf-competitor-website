'use client'

import { createAuthClient } from 'better-auth/react'

// Remove the invalid BETTER_AUTH_URL env var that's set to '343434'
// This prevents it from being passed to createAuthClient
if (typeof process !== 'undefined' && typeof process.env !== 'undefined') {
  const authUrl = process.env.BETTER_AUTH_URL
  if (authUrl && (authUrl.includes('343434') || authUrl === "'343434'" || !authUrl.startsWith('http'))) {
    delete process.env.BETTER_AUTH_URL
  }
}

// Get the proper base URL for auth client
const getAuthBaseURL = () => {
  // Use the current window location if available (in browser)
  if (typeof window !== 'undefined') {
    return window.location.origin
  }
  
  // Fallback for SSR
  return process.env.NEXT_PUBLIC_APP_URL || 'https://pdfilio.com'
}

export const authClient = createAuthClient({
  baseURL: getAuthBaseURL()
})

export const { signIn, signUp, signOut, useSession } = authClient

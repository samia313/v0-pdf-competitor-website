import { createAuthClient } from 'better-auth/react'

// Get the proper base URL for auth client
const getAuthBaseURL = () => {
  // Skip invalid BETTER_AUTH_URL values (like "343434")
  const authUrl = process.env.NEXT_PUBLIC_BETTER_AUTH_URL
  if (authUrl && authUrl !== '343434' && authUrl.startsWith('http')) {
    return authUrl
  }
  
  // Use the current window location if available
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

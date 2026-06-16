'use client'


 
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

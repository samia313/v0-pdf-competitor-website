'use client'

import { useRouter, usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  // Don't require auth for login page
  const isLoginPage = pathname === '/admin/login'

  useEffect(() => {
    if (isLoginPage) {
      setLoading(false)
      return
    }

    // Check if admin session cookie exists
    const adminSession = document.cookie
      .split('; ')
      .find(row => row.startsWith('admin-session='))

    if (!adminSession) {
      // Redirect to login if not authenticated
      if (typeof window !== 'undefined') {
        router.push('/admin/login')
      }
    } else {
      setAuthenticated(true)
    }

    setLoading(false)
  }, [router, isLoginPage])

  if (loading) {
    return null
  }

  if (!isLoginPage && !authenticated) {
    return null
  }

  return <>{children}</>
}

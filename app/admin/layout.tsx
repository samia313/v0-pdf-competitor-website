'use client'

import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [authenticated, setAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
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
  }, [router])

  if (loading) {
    return null
  }

  if (!authenticated) {
    return null
  }

  return <>{children}</>
}

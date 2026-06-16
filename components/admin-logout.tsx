'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { LogOut } from 'lucide-react'

export default function AdminLogout() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleLogout = async () => {
    setLoading(true)
    try {
      // Clear the cookie by calling logout API
      await fetch('/api/admin/logout', { method: 'POST' })
      router.push('/admin/login')
    } catch (error) {
      console.error('[v0] Logout error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      onClick={handleLogout}
      disabled={loading}
      variant="outline"
      className="gap-2"
    >
      <LogOut className="w-4 h-4" />
      {loading ? 'Logging out...' : 'Logout'}
    </Button>
  )
}

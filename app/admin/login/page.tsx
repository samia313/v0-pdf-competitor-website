'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Lock, AlertCircle, Shield, ArrowRight } from 'lucide-react'

export default function AdminLogin() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      const response = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json()

      if (!response.ok) {
        setError(data.message || 'Invalid credentials')
        return
      }

      router.push('/admin/orders')
    } catch (err) {
      setError('Login failed. Please try again.')
      console.error('[v0] Login error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 py-12">
      {/* Animated background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-slate-700/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative z-10">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="p-3 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 shadow-lg shadow-blue-500/20">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">PDFilio</h1>
              <p className="text-xs text-slate-400">Admin Portal</p>
            </div>
          </div>
          <p className="text-slate-300 text-sm font-medium">Secure Payment Management</p>
          <p className="text-slate-500 text-xs mt-2">Verify orders and manage subscriptions</p>
        </div>

        {/* Login Card */}
        <div className="rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/80 to-black backdrop-blur-xl shadow-2xl shadow-blue-500/5 p-8">
          <form onSubmit={handleLogin} className="space-y-5">
            {error && (
              <div className="p-4 rounded-lg bg-red-950/30 border border-red-900/50 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-sm font-medium text-red-300">Login failed</p>
                  <p className="text-xs text-red-400 mt-0.5">{error}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <label htmlFor="username" className="text-sm font-semibold text-slate-200">
                Username
              </label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
                autoFocus
                className="h-11 rounded-lg border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="password" className="text-sm font-semibold text-slate-200">
                Password
              </label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                className="h-11 rounded-lg border-slate-700 bg-slate-900/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/50 transition"
              />
            </div>

            <Button
              type="submit"
              className="w-full h-11 mt-6 rounded-lg font-semibold bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white shadow-lg shadow-blue-500/20 transition-all hover:shadow-blue-500/30 disabled:opacity-50"
              disabled={loading || !username || !password}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="w-4 h-4 rounded-full border-2 border-white/30 border-t-white animate-spin"></div>
                  Verifying credentials...
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Access Dashboard
                  <ArrowRight className="w-4 h-4" />
                </span>
              )}
            </Button>
          </form>

          {/* Security note */}
          <div className="mt-6 pt-6 border-t border-slate-800">
            <div className="flex items-start gap-3">
              <Lock className="w-4 h-4 text-slate-500 mt-1 flex-shrink-0" />
              <div>
                <p className="text-xs font-medium text-slate-400">Enterprise Security</p>
                <p className="text-xs text-slate-500 mt-1">Secure session. Automatic logout after 24 hours.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-6 text-center">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} PDFilio. All rights reserved.
          </p>
          <p className="text-xs text-slate-600 mt-1">
            Secure admin access. Encryption enabled.
          </p>
        </div>
      </div>
    </div>
  )
}

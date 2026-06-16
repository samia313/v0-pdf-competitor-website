'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FileText, Menu, User, LogOut, Crown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import { authClient } from '@/lib/auth-client'
import { useRouter, usePathname } from 'next/navigation'
import { LanguageSwitcher } from './language-switcher'
import { ThemeToggle } from './theme-toggle'

interface UserSession {
  user: {
    id: string
    name: string
    email: string
  }
}

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [session, setSession] = useState<UserSession | null>(null)
  const [subscription, setSubscription] = useState<any>(null)
  const router = useRouter()
  const pathname = usePathname()
  
  // Check if we're on homepage
  const isHomepage = pathname === '/' || pathname.match(/^\/\w{2}$/)

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await authClient.getSession()
        setSession(data as UserSession | null)
      } catch (error) {
        console.error('[Header] Session check failed:', error)
        setSession(null)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    async function fetchSubscription() {
      if (session?.user?.id) {
        try {
          const controller = new AbortController()
          const timeoutId = setTimeout(() => controller.abort(), 3000)
          
          const response = await fetch('/api/subscription', { 
            signal: controller.signal,
            cache: 'no-store'
          })
          
          clearTimeout(timeoutId)
          if (response.ok) {
            const data = await response.json()
            setSubscription(data)
          }
        } catch (error) {
          console.error('[Header] Subscription fetch failed:', error)
        }
      }
    }
    fetchSubscription()
  }, [session])

  const handleLogout = async () => {
    try {
      await authClient.signOut()
      setSession(null)
      router.push('/')
    } catch (error) {
      console.error('[Header] Logout failed:', error)
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        
        {/* Left - Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="h-5 w-5 text-white" />
          </div>
          <span className="font-bold hidden sm:inline">PDFilio</span>
        </Link>

        {/* Center - Navigation (Hidden on homepage, shown on tool pages) */}
        {!isHomepage && (
          <nav className="hidden lg:flex items-center gap-1">
            <Link href="/blog">
              <Button variant="ghost" className="text-sm">Blog</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-sm">Pricing</Button>
            </Link>
          </nav>
        )}

        {/* Center - CTA (Shown on homepage) */}
        {isHomepage && (
          <div className="hidden md:flex items-center gap-2">
            <Link href="#tools">
              <Button variant="ghost" className="text-sm">Explore Tools</Button>
            </Link>
            <Link href="/pricing">
              <Button variant="ghost" className="text-sm">Pricing</Button>
            </Link>
          </div>
        )}

        {/* Right side - Auth & Settings */}
        <div className="flex items-center gap-2 ml-auto">
          <LanguageSwitcher />
          <ThemeToggle />
          
          {session?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full h-8 w-8">
                  <div className="h-6 w-6 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="h-3 w-3" />
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <div className="px-2 py-1.5">
                  <p className="text-sm font-medium">{session.user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{session.user.email}</p>
                  {subscription?.planId && (
                    <div className="mt-2">
                      <Badge variant={subscription.planId === 'free' ? 'secondary' : 'default'} className="gap-1">
                        {subscription.planId === 'pro' || subscription.planId === 'business' ? (
                          <>
                            <Crown className="w-3 h-3" />
                            {subscription.planId.charAt(0).toUpperCase() + subscription.planId.slice(1)}
                          </>
                        ) : (
                          'Free Plan'
                        )}
                      </Badge>
                    </div>
                  )}
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="cursor-pointer text-sm">
                    <User className="mr-2 h-4 w-4" />
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {subscription?.planId === 'free' && (
                  <DropdownMenuItem asChild>
                    <Link href="/pricing" className="cursor-pointer text-sm">
                      <Crown className="mr-2 h-4 w-4" />
                      Upgrade Plan
                    </Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer text-sm text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <>
              <Link href="/auth/signin" className="hidden sm:inline">
                <Button variant="ghost" size="sm" className="text-sm">Sign In</Button>
              </Link>
              <Link href="/pricing" className="hidden sm:inline">
                <Button size="sm" className="text-sm">Get Premium</Button>
              </Link>
            </>
          )}

          {/* Mobile menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <nav className="flex flex-col gap-4 mt-8">
                {!isHomepage && (
                  <>
                    <Link href="/blog" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">Blog</Button>
                    </Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">Pricing</Button>
                    </Link>
                  </>
                )}
                {isHomepage && (
                  <>
                    <Link href="#tools" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">Explore Tools</Button>
                    </Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start text-base">Pricing</Button>
                    </Link>
                  </>
                )}
                {!session?.user && (
                  <>
                    <Link href="/auth/signin" onClick={() => setIsOpen(false)}>
                      <Button variant="outline" className="w-full">Sign In</Button>
                    </Link>
                    <Link href="/pricing" onClick={() => setIsOpen(false)}>
                      <Button className="w-full">Get Premium</Button>
                    </Link>
                  </>
                )}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

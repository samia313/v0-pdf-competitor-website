'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { FileText, Menu, ChevronDown, User, LogOut, Crown } from 'lucide-react'
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
import { categories, pdfTools } from '@/lib/tools-data'
import { ToolIcon } from './tool-icon'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
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

  useEffect(() => {
    async function checkSession() {
      try {
        const { data } = await authClient.getSession()
        setSession(data as UserSession | null)
      } catch {
        setSession(null)
      }
    }
    checkSession()
  }, [])

  useEffect(() => {
    async function fetchSubscription() {
      if (session?.user?.id) {
        try {
          const response = await fetch('/api/subscription')
          if (response.ok) {
            const data = await response.json()
            setSubscription(data)
          }
        } catch (error) {
          console.error('Failed to fetch subscription:', error)
        }
      }
    }
    fetchSubscription()
  }, [session?.user?.id])

  const handleSignOut = async () => {
    await authClient.signOut()
    setSession(null)
    router.push('/')
    router.refresh()
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary">
            <FileText className="h-4 w-4 text-white" />
          </div>
          <span className="text-lg font-bold text-foreground">
            pdf<span className="text-primary">ilio</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1 flex-1 ml-12">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1 text-xs px-3 py-1 h-8 text-white outline-none focus:outline-none focus-visible:outline-none">
                Organize PDF
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {pdfTools
                .filter((tool) => tool.category === 'organize')
                .map((tool) => (
                  <DropdownMenuItem key={tool.id} asChild>
                    <Link href={tool.href} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                        <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>
          
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1 text-xs px-3 py-1 h-8 text-white outline-none focus:outline-none focus-visible:outline-none">
                Optimize
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {pdfTools
                .filter((tool) => tool.category === 'optimize')
                .map((tool) => (
                  <DropdownMenuItem key={tool.id} asChild>
                    <Link href={tool.href} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                        <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1 text-xs px-3 py-1 h-8 text-white outline-none focus:outline-none focus-visible:outline-none">
                Convert to PDF
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {pdfTools
                .filter((tool) => tool.category === 'convert-to-pdf')
                .map((tool) => (
                  <DropdownMenuItem key={tool.id} asChild>
                    <Link href={tool.href} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                        <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gap-1 text-xs px-3 py-1 h-8 text-white outline-none focus:outline-none focus-visible:outline-none">
                Convert from PDF
                <ChevronDown className="h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {pdfTools
                .filter((tool) => tool.category === 'convert-from-pdf')
                .map((tool) => (
                  <DropdownMenuItem key={tool.id} asChild>
                    <Link href={tool.href} className="flex items-center gap-3 cursor-pointer">
                      <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                        <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{tool.name}</div>
                        <div className="text-xs text-muted-foreground">{tool.description}</div>
                      </div>
                    </Link>
                  </DropdownMenuItem>
                ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Link href="/blog">
            <Button className="text-xs px-3 py-1 h-8 text-white">Blog</Button>
          </Link>
          <Link href="/pricing">
            <Button className="text-xs px-3 py-1 h-8 text-white">Pricing</Button>
          </Link>
        </nav>

        {/* Right side auth section */}
        <div className="hidden lg:flex items-center gap-2 ml-auto">
          {session?.user ? (
            <>
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
                      <Link href="/pricing" className="cursor-pointer text-sm text-primary">
                        <Crown className="mr-2 h-4 w-4" />
                        Upgrade to Pro
                      </Link>
                    </DropdownMenuItem>
                  )}
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleSignOut} className="cursor-pointer text-destructive text-sm">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <ThemeToggle />
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link href="/auth/sign-in">
                <Button variant="ghost" size="sm" className="text-xs h-8 px-2">Sign In</Button>
              </Link>
              <Link href="/pricing">
                <Button size="sm" className="text-xs h-8 px-3">Get Premium</Button>
              </Link>
            </>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <div className="flex flex-col gap-4 mt-6">
              <Link href="/" onClick={() => setIsOpen(false)} className="flex items-center gap-2 mb-4">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                  <FileText className="h-5 w-5 text-primary-foreground" />
                </div>
              <span className="text-xl font-bold">
                pdf<span className="text-primary">ilio</span>
              </span>
              </Link>

              {/* User Section for Mobile */}
              {session?.user ? (
                <div className="pb-4 border-b">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold">
                      {session.user.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p className="font-medium">{session.user.name}</p>
                      <p className="text-sm text-muted-foreground">{session.user.email}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link href="/dashboard" onClick={() => setIsOpen(false)} className="flex-1">
                      <Button variant="outline" className="w-full">Dashboard</Button>
                    </Link>
                    <Button variant="outline" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="pb-4 border-b flex gap-2">
                  <Link href="/sign-in" onClick={() => setIsOpen(false)} className="flex-1">
                    <Button variant="outline" className="w-full">Sign In</Button>
                  </Link>
                  <Link href="/sign-up" onClick={() => setIsOpen(false)} className="flex-1">
                    <Button className="w-full">Sign Up</Button>
                  </Link>
                </div>
              )}

              {/* Quick Links */}
              <div className="space-y-1 pb-4 border-b">
                <Link href="/tools" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">All Tools</Button>
                </Link>
                <Link href="/blog" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Blog</Button>
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">About Us</Button>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Contact Us</Button>
                </Link>
                <Link href="/pricing" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Pricing</Button>
                </Link>
                <Link href="/faq" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">FAQ</Button>
                </Link>
                <Link href="/about" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">About</Button>
                </Link>
                <Link href="/contact" onClick={() => setIsOpen(false)}>
                  <Button variant="ghost" className="w-full justify-start">Contact</Button>
                </Link>
              </div>
              
              {categories.map((category) => (
                <div key={category.id} className="space-y-2">
                  <h3 className="font-semibold text-sm text-muted-foreground uppercase tracking-wider">
                    {category.name}
                  </h3>
                  <div className="space-y-1">
                    {pdfTools
                      .filter((tool) => tool.category === category.id)
                      .map((tool) => (
                        <Link
                          key={tool.id}
                          href={tool.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center gap-3 rounded-lg p-2 hover:bg-secondary transition-colors"
                        >
                          <div className={`h-8 w-8 rounded-md ${tool.color} flex items-center justify-center`}>
                            <ToolIcon icon={tool.icon} className="h-4 w-4 text-white" />
                          </div>
                          <span className="text-sm font-medium">{tool.name}</span>
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}

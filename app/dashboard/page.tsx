'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { authClient } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'
import { 
  FileText, 
  Crown, 
  Clock, 
  Download, 
  Zap,
  Shield,
  Star,
  ArrowRight,
  LogOut,
  Settings,
  History,
  CreditCard
} from 'lucide-react'

interface UserSession {
  user: {
    id: string
    name: string
    email: string
  }
}

export default function DashboardPage() {
  const [session, setSession] = useState<UserSession | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    async function checkSession() {
      const { data } = await authClient.getSession()
      if (!data?.user) {
        router.push('/sign-in')
        return
      }
      setSession(data as UserSession)
      setLoading(false)
    }
    checkSession()
  }, [router])

  const handleSignOut = async () => {
    await authClient.signOut()
    router.push('/')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    )
  }

  // Mock data - replace with real data from database
  const userStats = {
    plan: 'Free',
    tasksToday: 3,
    tasksLimit: 5,
    totalProcessed: 47,
    storageUsed: '12 MB',
    storageLimit: '25 MB'
  }

  const recentFiles = [
    { name: 'document.pdf', action: 'Merged', date: '2 hours ago', size: '2.4 MB' },
    { name: 'report.pdf', action: 'Compressed', date: '5 hours ago', size: '1.2 MB' },
    { name: 'presentation.pdf', action: 'Split', date: 'Yesterday', size: '5.6 MB' },
  ]

  const quickTools = [
    { name: 'Merge PDF', href: '/tools/merge-pdf', icon: FileText, color: 'bg-red-500' },
    { name: 'Compress PDF', href: '/tools/compress-pdf', icon: Zap, color: 'bg-green-500' },
    { name: 'Split PDF', href: '/tools/split-pdf', icon: FileText, color: 'bg-orange-500' },
    { name: 'PDF to Word', href: '/tools/pdf-to-word', icon: FileText, color: 'bg-blue-500' },
  ]

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">
              Welcome back, {session?.user?.name || 'User'}!
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your PDF tools and account settings
            </p>
          </div>
          <div className="flex gap-3 mt-4 md:mt-0">
            <Button variant="outline" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
            {userStats.plan === 'Free' && (
              <Link href="/pricing">
                <Button>
                  <Crown className="h-4 w-4 mr-2" />
                  Upgrade to Premium
                </Button>
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Current Plan</CardTitle>
              <Crown className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-bold">{userStats.plan}</span>
                <Badge variant={userStats.plan === 'Free' ? 'secondary' : 'default'}>
                  {userStats.plan === 'Free' ? 'Limited' : 'Active'}
                </Badge>
              </div>
              {userStats.plan === 'Free' && (
                <p className="text-xs text-muted-foreground mt-1">
                  Upgrade for unlimited access
                </p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Tasks Today</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {userStats.tasksToday} / {userStats.tasksLimit}
              </div>
              <div className="w-full bg-muted rounded-full h-2 mt-2">
                <div 
                  className="bg-primary h-2 rounded-full" 
                  style={{ width: `${(userStats.tasksToday / userStats.tasksLimit) * 100}%` }}
                ></div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Files Processed</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.totalProcessed}</div>
              <p className="text-xs text-muted-foreground">All time</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">Storage Used</CardTitle>
              <Download className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{userStats.storageUsed}</div>
              <p className="text-xs text-muted-foreground">of {userStats.storageLimit}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Quick Tools */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Quick Tools</CardTitle>
                <CardDescription>Access your most used PDF tools</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {quickTools.map((tool) => (
                    <Link key={tool.name} href={tool.href}>
                      <div className="flex flex-col items-center p-4 rounded-lg border hover:border-primary hover:shadow-md transition-all cursor-pointer">
                        <div className={`${tool.color} p-3 rounded-lg mb-2`}>
                          <tool.icon className="h-6 w-6 text-white" />
                        </div>
                        <span className="text-sm font-medium text-center">{tool.name}</span>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/tools" className="block mt-4">
                  <Button variant="outline" className="w-full">
                    View All Tools
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <History className="h-5 w-5" />
                  Recent Activity
                </CardTitle>
                <CardDescription>Your recently processed files</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentFiles.map((file, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded">
                          <FileText className="h-5 w-5 text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{file.action} - {file.size}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{file.date}</span>
                        <Button variant="ghost" size="sm">
                          <Download className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Account Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Account
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50">
                  <div className="bg-primary text-primary-foreground rounded-full h-10 w-10 flex items-center justify-center font-bold">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div>
                    <p className="font-medium">{session?.user?.name}</p>
                    <p className="text-sm text-muted-foreground">{session?.user?.email}</p>
                  </div>
                </div>
                <Button variant="outline" className="w-full justify-start">
                  <Settings className="h-4 w-4 mr-2" />
                  Account Settings
                </Button>
                <Button variant="outline" className="w-full justify-start">
                  <CreditCard className="h-4 w-4 mr-2" />
                  Billing & Subscription
                </Button>
              </CardContent>
            </Card>

            {/* Upgrade Card */}
            {userStats.plan === 'Free' && (
              <Card className="bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    Go Premium
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 mb-4">
                    <li className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      Unlimited PDF tasks
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      No advertisements
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      Priority processing
                    </li>
                    <li className="flex items-center gap-2 text-sm">
                      <Shield className="h-4 w-4 text-primary" />
                      OCR & AI tools access
                    </li>
                  </ul>
                  <Link href="/pricing">
                    <Button className="w-full">
                      Upgrade Now
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )}

            {/* Help Card */}
            <Card>
              <CardHeader>
                <CardTitle>Need Help?</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Link href="/contact">
                  <Button variant="outline" className="w-full justify-start">
                    Contact Support
                  </Button>
                </Link>
                <a 
                  href="https://wa.me/923450100172" 
                  target="_blank" 
                  rel="noopener noreferrer"
                >
                  <Button variant="outline" className="w-full justify-start text-green-600">
                    WhatsApp Support
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

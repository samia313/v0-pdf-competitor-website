'use client'

import { useState } from 'react'
import Link from 'next/link'
import { getAdminUsers, addAdminUser, removeAdminUser } from '@/app/actions/admin'
import { 
  FileText, 
  Settings,
  MessageSquare,
  Home,
  ShoppingCart,
  Users,
  Plus,
  Trash2,
  Shield
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import useSWR from 'swr'

export default function SettingsPage() {
  const [newAdminEmail, setNewAdminEmail] = useState('')
  const { data: admins, mutate } = useSWR('admins', getAdminUsers)

  const handleAddAdmin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (newAdminEmail) {
      try {
        await addAdminUser(newAdminEmail)
        setNewAdminEmail('')
        mutate()
      } catch (error) {
        alert('Failed to add admin. Make sure you are a superadmin.')
      }
    }
  }

  const handleRemoveAdmin = async (email: string) => {
    if (confirm(`Are you sure you want to remove ${email} as admin?`)) {
      try {
        await removeAdminUser(email)
        mutate()
      } catch (error) {
        alert('Failed to remove admin. Make sure you are a superadmin.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-background border-r p-4">
        <div className="flex items-center gap-2 mb-8 px-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <FileText className="w-5 h-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold">OrbixDocs</span>
        </div>
        
        <nav className="space-y-2">
          <Link href="/admin">
            <Button variant="ghost" className="w-full justify-start">
              <Home className="w-4 h-4 mr-2" />
              Dashboard
            </Button>
          </Link>
          <Link href="/admin/orders">
            <Button variant="ghost" className="w-full justify-start">
              <ShoppingCart className="w-4 h-4 mr-2" />
              Orders
            </Button>
          </Link>
          <Link href="/admin/subscriptions">
            <Button variant="ghost" className="w-full justify-start">
              <Users className="w-4 h-4 mr-2" />
              Subscriptions
            </Button>
          </Link>
          <Link href="/admin/contacts">
            <Button variant="ghost" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="secondary" className="w-full justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Settings
            </Button>
          </Link>
        </nav>
        
        <div className="absolute bottom-4 left-4 right-4">
          <Link href="/">
            <Button variant="outline" className="w-full">
              Back to Site
            </Button>
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage admin users and settings</p>
        </div>
        
        <div className="grid gap-6">
          {/* Admin Users */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Admin Users
            </h2>
            
            <form onSubmit={handleAddAdmin} className="flex gap-2 mb-6">
              <Input
                type="email"
                placeholder="Enter email address"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                className="max-w-md"
              />
              <Button type="submit">
                <Plus className="w-4 h-4 mr-2" />
                Add Admin
              </Button>
            </form>
            
            <div className="space-y-2">
              {admins?.map((admin) => (
                <div key={admin.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Users className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">{admin.email}</p>
                      <p className="text-sm text-muted-foreground capitalize">{admin.role}</p>
                    </div>
                  </div>
                  {admin.role !== 'superadmin' && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => handleRemoveAdmin(admin.email)}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
          </Card>
          
          {/* Payment Settings Info */}
          <Card className="p-6">
            <h2 className="text-xl font-semibold mb-4">Payment Settings</h2>
            <div className="space-y-4 text-sm">
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">JazzCash</p>
                <p className="text-muted-foreground">0303-9109260 (Naveed Ahmad Sharif)</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">Easypaisa</p>
                <p className="text-muted-foreground">0345-0100172 (Naveed Ahmad Sharif)</p>
              </div>
              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="font-medium mb-2">Bank Transfer</p>
                <p className="text-muted-foreground">Faysal Bank - 3667786000002590</p>
                <p className="text-muted-foreground">IBAN: PK83FAYS3667786000002590</p>
              </div>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              To change payment details, edit lib/payment-config.ts file
            </p>
          </Card>
        </div>
      </main>
    </div>
  )
}

'use client'

import Link from 'next/link'
import { getContactSubmissions, updateContactStatus } from '@/app/actions/admin'
import { 
  FileText, 
  Settings,
  MessageSquare,
  Home,
  ShoppingCart,
  Users,
  Mail,
  Clock,
  CheckCircle
} from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import useSWR from 'swr'

export default function ContactsPage() {
  const { data: contacts, mutate } = useSWR('contacts', getContactSubmissions)

  const handleUpdateStatus = async (id: number, status: string) => {
    await updateContactStatus(id, status)
    mutate()
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">New</span>
      case 'read':
        return <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full text-xs font-medium">Read</span>
      case 'responded':
        return <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">Responded</span>
      default:
        return <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">{status}</span>
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
            <Button variant="secondary" className="w-full justify-start">
              <MessageSquare className="w-4 h-4 mr-2" />
              Messages
            </Button>
          </Link>
          <Link href="/admin/settings">
            <Button variant="ghost" className="w-full justify-start">
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
          <h1 className="text-3xl font-bold">Contact Messages</h1>
          <p className="text-muted-foreground">Manage customer inquiries</p>
        </div>
        
        <Card className="p-6">
          {!contacts || contacts.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>No messages yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {contacts.map((contact) => (
                <div key={contact.id} className="border rounded-lg p-4 hover:bg-muted/50">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold">{contact.subject}</h3>
                      <p className="text-sm text-muted-foreground flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        {contact.name} ({contact.email})
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      {getStatusBadge(contact.status)}
                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {new Date(contact.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4 bg-muted/50 p-3 rounded-md">{contact.message}</p>
                  
                  <div className="flex gap-2">
                    {contact.status === 'new' && (
                      <Button size="sm" variant="outline" onClick={() => handleUpdateStatus(contact.id, 'read')}>
                        Mark as Read
                      </Button>
                    )}
                    {contact.status !== 'responded' && (
                      <Button size="sm" onClick={() => handleUpdateStatus(contact.id, 'responded')}>
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark as Responded
                      </Button>
                    )}
                    <a href={`mailto:${contact.email}?subject=Re: ${contact.subject}`}>
                      <Button size="sm" variant="outline">
                        <Mail className="w-4 h-4 mr-2" />
                        Reply via Email
                      </Button>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </Card>
      </main>
    </div>
  )
}

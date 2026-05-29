import { auth } from '@/lib/auth'
import { headers } from 'next/headers'
import { redirect } from 'next/navigation'
import { db } from '@/lib/db'
import { adminUsers } from '@/lib/db/schema'
import { eq } from 'drizzle-orm'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth.api.getSession({ headers: await headers() })
  
  if (!session?.user?.email) {
    redirect('/sign-in')
  }
  
  // Check if user is admin
  const admins = await db.select().from(adminUsers).where(eq(adminUsers.email, session.user.email))
  
  if (admins.length === 0) {
    redirect('/')
  }
  
  return <>{children}</>
}

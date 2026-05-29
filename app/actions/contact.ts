'use server'

import { db } from '@/lib/db'
import { contactSubmissions } from '@/lib/db/schema'

export async function submitContactForm(data: {
  name: string
  email: string
  subject: string
  message: string
}) {
  await db.insert(contactSubmissions).values({
    name: data.name,
    email: data.email,
    subject: data.subject,
    message: data.message,
    status: 'new',
  })
  
  return { success: true }
}

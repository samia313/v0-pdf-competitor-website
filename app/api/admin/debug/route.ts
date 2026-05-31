import { NextResponse } from 'next/server'
import crypto from 'crypto'

export async function GET() {
  const envPassword = process.env.ADMIN_PASSWORD || 'admin123'
  const envHash = crypto.createHash('sha256').update(envPassword).digest('hex')
  const testHash = crypto.createHash('sha256').update('admin123').digest('hex')
  
  return NextResponse.json({
    envPassword: envPassword.substring(0, 5) + '***',
    envHash: envHash,
    testHash: testHash,
    match: envHash === testHash
  })
}

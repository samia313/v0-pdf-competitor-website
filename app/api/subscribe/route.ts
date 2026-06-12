import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    // TODO: Implement proper session handling with Better Auth
    return NextResponse.json({ error: 'Not implemented yet' }, { status: 501 })
  } catch (error) {
    console.error('Subscribe error:', error)
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}

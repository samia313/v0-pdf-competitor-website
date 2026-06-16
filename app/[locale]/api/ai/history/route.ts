import { NextResponse } from 'next/server'
import { authClient } from '@/lib/auth-client'
import { getUserAnalysisHistory } from '@/lib/ai-documents'

export async function GET() {
  try {
    const { data: session } = await authClient.getSession()
    if (!session?.user?.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    const userId = session.user.id
    const history = await getUserAnalysisHistory(userId, 20)

    return NextResponse.json({ history })
  } catch (error) {
    console.error('[v0] History fetch error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to fetch history' },
      { status: 500 }
    )
  }
}

import { NextRequest } from 'next/server'
import { successResponse, handleCorsPreFlight, addCorsHeaders } from '@/lib/api-utils'

export async function GET(req: NextRequest) {
  // Handle CORS preflight
  const corsResponse = handleCorsPreFlight(req)
  if (corsResponse) return corsResponse

  const response = successResponse({
    status: 'ok',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    endpoints: {
      merge: 'POST /merge',
      convert: 'POST /convert',
      summarize: 'POST /summarize',
      chat: 'POST /ai/chat',
      extract: 'POST /ai/extract',
      translate: 'POST /ai/translate',
      ocr: 'POST /ai/ocr',
      invoice: 'POST /ai/invoice',
      coverLetter: 'POST /ai/cover-letter',
      studyNotes: 'POST /ai/study-notes',
      quiz: 'POST /ai/quiz',
      metadata: 'POST /ai/metadata',
    },
  })

  return addCorsHeaders(response)
}

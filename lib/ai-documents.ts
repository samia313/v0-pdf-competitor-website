import { db } from '@/lib/db'

export interface AIDocument {
  id: number
  userId: string
  fileName: string
  fileSize: number
  fileContent: Buffer
  uploadedAt: Date
  expiresAt: Date | null
}

export interface AIAnalysis {
  id: number
  documentId: number
  userId: string
  featureType: 'summarize' | 'translate' | 'extract' | 'clauses' | 'notes' | 'flashcards'
  targetLanguage?: string
  result: string
  tokensUsed?: number
  createdAt: Date
}

/**
 * Save uploaded PDF document
 */
export async function saveAIDocument(
  userId: string,
  fileName: string,
  fileContent: Buffer,
  expiresInDays: number = 7
): Promise<AIDocument> {
  const expiresAt = new Date()
  expiresAt.setDate(expiresAt.getDate() + expiresInDays)

  const result = await db.query(
    `INSERT INTO ai_documents (userId, fileName, fileSize, fileContent, expiresAt)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [userId, fileName, fileContent.length, fileContent, expiresAt]
  )

  return result.rows[0]
}

/**
 * Get document by ID
 */
export async function getAIDocument(documentId: number, userId: string): Promise<AIDocument | null> {
  const result = await db.query(
    `SELECT * FROM ai_documents WHERE id = $1 AND userId = $2`,
    [documentId, userId]
  )
  return result.rows[0] || null
}

/**
 * Save analysis result
 */
export async function saveAIAnalysis(
  documentId: number,
  userId: string,
  featureType: AIAnalysis['featureType'],
  result: string,
  targetLanguage?: string,
  tokensUsed?: number
): Promise<AIAnalysis> {
  const queryResult = await db.query(
    `INSERT INTO ai_analyses (documentId, userId, featureType, targetLanguage, result, tokensUsed)
     VALUES ($1, $2, $3, $4, $5, $6)
     RETURNING *`,
    [documentId, userId, featureType, targetLanguage || null, result, tokensUsed || null]
  )

  return queryResult.rows[0]
}

/**
 * Get analysis history for user
 */
export async function getUserAnalysisHistory(
  userId: string,
  limit: number = 10
): Promise<(AIAnalysis & { fileName: string })[]> {
  const result = await db.query(
    `SELECT a.*, d.fileName
     FROM ai_analyses a
     JOIN ai_documents d ON a.documentId = d.id
     WHERE a.userId = $1
     ORDER BY a.createdAt DESC
     LIMIT $2`,
    [userId, limit]
  )

  return result.rows
}

/**
 * Track AI feature usage
 */
export async function trackAIUsage(
  userId: string,
  featureType: string,
  tokensUsed: number,
  documentSize: number
): Promise<void> {
  await db.query(
    `INSERT INTO ai_usage_tracking (userId, featureType, tokensUsed, documentSize)
     VALUES ($1, $2, $3, $4)`,
    [userId, featureType, tokensUsed, documentSize]
  )
}

/**
 * Get user's monthly token usage
 */
export async function getUserMonthlyTokenUsage(userId: string): Promise<number> {
  const result = await db.query(
    `SELECT COALESCE(SUM(tokensUsed), 0) as total
     FROM ai_usage_tracking
     WHERE userId = $1
     AND createdAt >= date_trunc('month', CURRENT_TIMESTAMP)`,
    [userId]
  )

  return result.rows[0]?.total || 0
}

/**
 * Delete expired documents
 */
export async function deleteExpiredDocuments(): Promise<number> {
  const result = await db.query(
    `DELETE FROM ai_documents
     WHERE expiresAt < CURRENT_TIMESTAMP
     RETURNING id`
  )

  return result.rowCount || 0
}

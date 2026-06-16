# Neon Database Migration Setup for AI Document Assistant

## Overview
The AI Document Assistant feature requires three new tables in your Neon PostgreSQL database to store documents, analysis results, and usage tracking.

## Quick Setup (3 Steps)

### Step 1: Copy the Migration SQL
The migration file is located at: `migrations/ai-documents.sql`

### Step 2: Execute in Neon Console
1. Go to https://console.neon.tech
2. Open your database console for the PDFilio project
3. Copy all SQL from `migrations/ai-documents.sql`
4. Paste into the Neon SQL editor
5. Click "Execute" button

### Step 3: Verify Tables Created
Run this query in Neon console to verify:
```sql
SELECT tablename FROM pg_tables 
WHERE tablename LIKE 'ai_%' 
ORDER BY tablename;
```

Expected output:
- `ai_analyses`
- `ai_documents`
- `ai_usage_tracking`

## Tables Created

### ai_documents
- Stores uploaded PDF files for analysis
- Fields: id, userId, fileName, fileSize, fileContent, uploadedAt, expiresAt
- Indexes: userId, uploadedAt

### ai_analyses
- Stores analysis results for each feature (Summarize, Translate, Extract, etc.)
- Fields: id, documentId, userId, featureType, targetLanguage, result, tokensUsed, createdAt
- Indexes: userId, featureType, documentId

### ai_usage_tracking
- Tracks AI token usage per user for rate limiting and premium enforcement
- Fields: id, userId, featureType, tokensUsed, documentSize, createdAt
- Indexes: userId, createdAt

## Manual Execution (Alternative)

If you prefer to run the migration via CLI:

```bash
# Using psql
psql $DATABASE_URL < migrations/ai-documents.sql

# Or with npm script (if configured)
npm run migrate:ai-documents
```

## Troubleshooting

**Error: Foreign key constraint failed**
- Ensure the `public."user"` table exists (created by Better Auth)
- Run migration after Better Auth tables are initialized

**Error: Table already exists**
- The `IF NOT EXISTS` clause prevents duplicate errors
- Safe to run multiple times

**Data Not Appearing**
- Verify userId values match your user table
- Check that premium users have subscription records

## Rollback (if needed)

To remove these tables:
```sql
DROP TABLE IF EXISTS ai_usage_tracking;
DROP TABLE IF EXISTS ai_analyses;
DROP TABLE IF EXISTS ai_documents;
```

## Next Steps

After running the migration:
1. Users can access the AI Document Assistant at `/tools/ai-document-assistant`
2. Feature is available only to premium subscribers
3. Usage is automatically tracked in `ai_usage_tracking` table
4. Analysis results are stored in `ai_analyses` for history

Questions? Check `AI_DOCUMENT_ASSISTANT_GUIDE.md` for full documentation.

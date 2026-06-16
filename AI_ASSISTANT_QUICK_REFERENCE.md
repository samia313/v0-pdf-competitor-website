# AI Document Assistant - Developer Quick Reference
## June 14, 2025

## Key Files

| File | Purpose |
|------|---------|
| `app/tools/ai-document-assistant/page.tsx` | Main UI component - PDF upload, feature selection, results |
| `app/api/ai/analyze/route.ts` | Streaming API for AI analysis with premium checks |
| `app/api/ai/history/route.ts` | Get user's analysis history |
| `lib/ai-documents.ts` | Database utilities for document & analysis storage |
| `lib/premium-utils.ts` | Premium subscription validation & token tracking |
| `migrations/ai-documents.sql` | Database schema (to run manually via Neon console) |

## Core Functions

### AI Analysis (`app/api/ai/analyze/route.ts`)
```typescript
POST /api/ai/analyze
- Validates authentication & premium status
- Extracts text from PDF using pdf-lib
- Streams AI response from Vercel AI Gateway
- Tracks tokens used and updates usage
- Returns Server-Sent Events (SSE) stream
```

### Premium Validation (`lib/premium-utils.ts`)
```typescript
isPremiumUser(userId: string): Promise<boolean>
- Checks subscription status from database
- Returns true if user has active premium subscription

checkAITokenUsage(userId: string): Promise<UsageStatus>
- Gets current month's token usage
- Returns { used, limit, exceeded }
- Prevents API calls if exceeded
```

### Database Operations (`lib/ai-documents.ts`)
```typescript
saveAIAnalysis(data: AnalysisData): Promise<void>
- Stores analysis results in database
- Records analysis type, results, tokens used

trackAIUsage(userId: string, tokensUsed: number): Promise<void>
- Updates monthly token counter
- Used for billing and rate limiting
```

## Database Tables

### ai_documents
Store user's uploaded PDFs and extracted content.

### ai_analyses
Store results of each analysis with metadata.

### ai_usage_tracking
Track monthly token usage per user for billing.

## Adding New Features

To add a new AI feature (e.g., "Extract Metadata"):

1. **Add to Feature Type:**
   ```typescript
   type FeatureType = 'summarize' | 'translate' | 'extract' | 'clauses' | 'notes' | 'flashcards' | 'metadata'
   ```

2. **Create Prompt:**
   ```typescript
   const FEATURE_PROMPTS = {
     metadata: "Extract and organize all metadata, author, dates, and document properties..."
   }
   ```

3. **Add UI Button:**
   ```tsx
   <Button onClick={() => handleFeatureClick(features.find(f => f.id === 'metadata'))}>
     Extract Metadata
   </Button>
   ```

4. **Update Database:**
   Ensure ai_analyses table supports new analysis_type enum value.

## Environment Variables Required

- `DATABASE_URL` - Neon PostgreSQL connection (from .env.development.local)
- AI Gateway configured automatically (no additional keys needed)

## Testing Endpoints

### Test Summarize
```bash
curl -X POST http://localhost:3000/api/ai/analyze \
  -H "Content-Type: application/json" \
  -d '{"fileContent":"...", "feature":"summarize"}'
```

### Check Usage
```bash
curl http://localhost:3000/api/ai/history \
  -H "Authorization: Bearer [token]"
```

## Performance Notes

- PDF extraction can be slow for large files (>50MB)
- Streaming responses reduce perceived latency
- Token usage is the main cost driver
- Consider caching for repeated queries

## Common Issues

**Issue:** 403 Premium Required
**Fix:** Ensure user has active subscription, check isPremiumUser() logic

**Issue:** Streaming stops early
**Fix:** Check AI Gateway timeout settings, increase if needed

**Issue:** Database write fails
**Fix:** Verify Neon connection, check migrations were applied

## Monitoring

- Check token usage: `SELECT * FROM ai_usage_tracking WHERE user_id = $1`
- Monitor API latency: Check Vercel Analytics
- Review error logs: Check Vercel Function Logs
- Track feature usage: Query ai_analyses table by analysis_type

## Next Steps

1. Run database migrations manually via Neon console
2. Test each feature with sample documents
3. Monitor token usage after launch
4. Gather user feedback for improvements
5. Optimize prompts based on usage patterns

# AI Document Assistant - Implementation Guide
## June 14, 2025

## Overview

The AI Document Assistant is a premium feature that allows authenticated users to upload PDFs and leverage AI to perform advanced document analysis. It provides 6 different analysis capabilities using Vercel AI Gateway for streaming responses.

## Features Implemented

### 1. Summarize PDF
Generates a concise summary highlighting key points, main topics, and essential information from the document.

### 2. Translate Document
Detects the original language and translates the entire document to the user's target language.

### 3. Extract Data
Identifies and extracts structured data from tables, forms, and key-value pairs in the document.

### 4. Find Important Clauses
Scans documents for legal terminology, important clauses, and critical contractual terms.

### 5. Create Notes
Automatically generates well-organized study notes with section headers and bullet points.

### 6. Create Flashcards
Creates question-answer pairs suitable for spaced repetition learning systems.

## Architecture

### Frontend Components

**Tool Page: `/app/tools/ai-document-assistant/page.tsx`**
- PDF upload with drag-and-drop support
- Premium access validation
- Authentication requirement
- 6 feature selector buttons
- Chat-like interface for displaying results
- Copy, download, and share functionality
- Real-time streaming UI updates

### Backend API Routes

**`/app/api/ai/analyze` (POST)**
- Accepts PDF file or extracted text
- Validates premium subscription
- Checks token usage limits
- Streams AI analysis using Vercel AI Gateway
- Tracks usage for billing purposes
- Returns chunked streaming response

**`/app/api/ai/history` (GET)**
- Retrieves user's analysis history
- Pagination support
- Filters by analysis type
- Returns saved results

### Database Schema

**ai_documents Table:**
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key to users table)
- filename: TEXT
- file_size: INTEGER
- pages_count: INTEGER
- uploaded_at: TIMESTAMP
- extracted_text: TEXT
- metadata: JSONB
```

**ai_analyses Table:**
```sql
- id: UUID (primary key)
- document_id: UUID (foreign key)
- user_id: UUID (foreign key)
- analysis_type: ENUM (summarize, translate, extract, clauses, notes, flashcards)
- language: TEXT (for translate feature)
- result_text: TEXT
- result_metadata: JSONB
- created_at: TIMESTAMP
- tokens_used: INTEGER
```

**ai_usage_tracking Table:**
```sql
- id: UUID (primary key)
- user_id: UUID (foreign key)
- month: DATE
- analyses_count: INTEGER
- tokens_used: INTEGER
- max_tokens: INTEGER
```

## Security Implementation

### Authentication
- Required login via existing auth system
- Premium subscription validation on every request
- Session-based access control

### Premium Gate
- API routes check `isPremiumUser()` before processing
- Frontend shows upgrade prompt if not premium
- Prevents unauthorized feature access

### Rate Limiting
- Monthly token limits per subscription tier
- Per-request token tracking
- Usage tracking in database
- Returns 429 error if limit exceeded

### Data Protection
- User data stored securely in Neon PostgreSQL
- Per-query userId scoping
- No cross-user data access
- HTTPS encryption in transit

## API Specifications

### Analyze Endpoint

**Request:**
```bash
POST /api/ai/analyze
Content-Type: application/json

{
  "fileContent": "string or base64",
  "feature": "summarize|translate|extract|clauses|notes|flashcards",
  "language": "en" // optional, for translate feature
}
```

**Response (Streaming):**
```
event: text-delta
data: {"delta":"Chunk of response text"}

event: text-delta
data: {"delta":" more text..."}

event: text-finish
data: {"finishReason":"stop"}
```

### History Endpoint

**Request:**
```bash
GET /api/ai/history?page=1&limit=10
Authorization: Bearer [session-token]
```

**Response:**
```json
{
  "analyses": [
    {
      "id": "uuid",
      "document_id": "uuid",
      "analysis_type": "summarize",
      "result_text": "...",
      "created_at": "2025-06-14T10:30:00Z",
      "tokens_used": 1500
    }
  ],
  "total": 42,
  "page": 1
}
```

## AI Gateway Integration

**Model Used:** Vercel AI Gateway (default routing)

**Prompts by Feature:**

1. **Summarize:** "Provide a concise 3-5 paragraph summary of this document highlighting key points."

2. **Translate:** "Translate this document to [TARGET_LANGUAGE]. Maintain formatting and structure."

3. **Extract:** "Extract all tables, data, and structured information from this document in JSON format."

4. **Clauses:** "Identify and highlight all important clauses, legal terms, and critical sections."

5. **Notes:** "Create well-organized study notes with section headers, key concepts, and bullet points."

6. **Flashcards:** "Generate 10-15 question-answer pairs for studying this document content."

## Usage Tracking

### Token Counting
- Each API call counts tokens used by the model
- Tracked in ai_usage_tracking table
- Aggregated by month for billing

### Rate Limits by Tier
- Free: Not available (premium only)
- Pro: 50,000 tokens/month
- Business: 250,000 tokens/month
- Enterprise: Unlimited

### Monitoring
- Real-time tracking via database
- Monthly reset on billing date
- Usage alerts at 80% threshold

## User Flow

```
1. User navigates to /tools/ai-document-assistant
2. Authentication check (redirects if not logged in)
3. Premium validation (shows upgrade prompt if not premium)
4. Upload PDF (drag & drop or click to browse)
5. Select feature or ask custom question
6. AI processes (streaming response visible in real-time)
7. Results display with options:
   - Copy to clipboard
   - Download as PDF
   - Save to history
   - Ask follow-up question
8. Access previous analyses via history
```

## File Structure

```
/app
  /tools
    /ai-document-assistant
      page.tsx (main tool component)
  /api
    /ai
      /analyze
        route.ts (AI analysis endpoint)
      /history
        route.ts (get analysis history)

/lib
  ai-documents.ts (database utilities)
  premium-utils.ts (subscription validation)
```

## Deployment Status

- **Deployed:** June 14, 2025
- **URL:** https://www.pdfilio.com/tools/ai-document-assistant
- **Environment:** Production
- **Status:** ✓ Live and active

## Testing Instructions

### Test Premium Feature:
1. Sign up as a user
2. Navigate to /tools/ai-document-assistant
3. See upgrade prompt (free users)
4. Upgrade to premium
5. Upload a PDF file
6. Click a feature button
7. Watch streaming response

### Test Features:
1. **Summarize:** Upload any document, expect concise summary
2. **Translate:** Upload English doc, translate to Spanish
3. **Extract:** Upload table/form heavy document
4. **Clauses:** Upload contract or legal document
5. **Notes:** Upload study material
6. **Flashcards:** Upload textbook chapter

### Test Rate Limiting:
1. Make repeated API calls
2. Check token usage in database
3. Verify limits enforced at 100% usage

## Future Enhancements

- Multi-file comparison analysis
- Batch processing capabilities
- Custom prompt templates
- Advanced filtering and search
- Integration with document storage systems
- Webhook support for third-party apps
- API for external developers
- Advanced caching for repeated queries

## Troubleshooting

### 401 Unauthorized
- Check authentication token
- Ensure session is valid
- Re-login if needed

### 403 Forbidden (Not Premium)
- Verify subscription status
- Check billing information
- Upgrade if needed

### 429 Too Many Requests
- Exceeded token limits for the month
- Wait until next billing cycle
- Upgrade for higher limits

### 500 Server Error
- Check AI Gateway availability
- Verify database connectivity
- Review server logs

## Support

For issues or questions:
- Email: support@pdfilio.com
- Help Portal: https://www.pdfilio.com/help
- Documentation: https://www.pdfilio.com/docs

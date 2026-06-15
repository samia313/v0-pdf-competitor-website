# PDFilio API Documentation

## Base URL
```
https://api.pdfilio.com/v1
```

## Authentication
All endpoints require authentication via Better Auth session or API Key.

### Session Authentication
Include your session cookie or Bearer token with requests.

### Headers
```
Content-Type: application/json
Authorization: Bearer <token>  (optional, uses session by default)
X-API-Key: <api-key>           (optional, for programmatic access)
```

## Response Format

### Success Response
```json
{
  "success": true,
  "data": {
    "result": "processing data"
  },
  "processingTime": 1234
}
```

### Error Response
```json
{
  "success": false,
  "error": "Error message"
}
```

## Rate Limiting

- Free Plan: 5 requests/minute
- Pro Plan: 50 requests/minute
- Business Plan: 500 requests/minute
- Enterprise: Unlimited

Rate limit headers:
```
X-RateLimit-Limit: 50
X-RateLimit-Remaining: 49
X-RateLimit-Reset: 1234567890
```

## Endpoints

### Core Operations

#### 1. Health Check
```
GET /health
```
Returns API status and available endpoints.

#### 2. Summarize PDF
```
POST /summarize
```
Generate AI summary of PDF content.

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "format": "text"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "summary": "Summarized content...",
    "wordCount": 150
  },
  "processingTime": 2345
}
```

#### 3. OCR - Extract Text
```
POST /ocr
```
Extract text from scanned or image-based PDFs.

**Request:**
```json
{
  "file": "base64_encoded_pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "extractedText": "Extracted content...",
    "characterCount": 5000,
    "wordCount": 800,
    "language": "auto-detected"
  }
}
```

#### 4. Convert PDF
```
POST /convert
```
Convert PDF to other formats (PNG, JPG, WEBP, TXT, DOCX).

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "format": "png"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "format": "png",
    "originalSize": 50000,
    "convertedSize": 40000,
    "status": "converted",
    "downloadUrl": "/api/v1/download/xyz-converted.png"
  }
}
```

#### 5. Merge PDFs
```
POST /merge
```
Combine multiple PDFs into one.

**Request:**
```json
{
  "files": [
    "base64_file_1",
    "base64_file_2",
    "base64_file_3"
  ],
  "fileName": "merged-document"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "mergedId": "MERGED-123456",
    "fileName": "merged-document.pdf",
    "fileCount": 3,
    "totalSize": 150000,
    "status": "merged",
    "downloadUrl": "/api/v1/download/xyz-merged.pdf"
  }
}
```

### AI Features

#### 1. Chat with PDF
```
POST /ai/chat
```
Ask questions about PDF content.

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "question": "What is the main topic?"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "question": "What is the main topic?",
    "answer": "The main topic is...",
    "tokens": 245
  }
}
```

#### 2. Extract Data
```
POST /ai/extract
```
Extract structured data from PDFs.

**Request:**
```json
{
  "file": "base64_encoded_pdf"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "extracted": "Names: ..., Dates: ..., Amounts: ...",
    "tokens": 320
  }
}
```

#### 3. Translate PDF
```
POST /ai/translate
```
Translate document to another language.

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "targetLanguage": "Spanish"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "targetLanguage": "Spanish",
    "translated": "Translated content...",
    "tokens": 420
  }
}
```

#### 4. Generate Quiz
```
POST /ai/quiz
```
Create multiple-choice questions from PDF.

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "numQuestions": 5
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "numQuestions": 5,
    "quiz": "Q1: Question? A) Option A B) Option B C) Option C D) Option D Answer: A\n...",
    "tokens": 350
  }
}
```

#### 5. Generate Invoice
```
POST /ai/invoice
```
Create professional invoice.

**Request:**
```json
{
  "clientName": "Client Inc",
  "amount": 1000,
  "items": [
    {"description": "Service", "quantity": 1, "rate": 1000}
  ]
}
```

#### 6. Generate Cover Letter
```
POST /ai/cover-letter
```
Create personalized cover letter.

**Request:**
```json
{
  "jobTitle": "Software Engineer",
  "company": "TechCorp",
  "skills": "React, Node.js, AWS"
}
```

#### 7. Study Notes Generator
```
POST /ai/study-notes
```
Convert PDF to study notes.

**Request:**
```json
{
  "file": "base64_encoded_pdf"
}
```

#### 8. PDF Metadata Editor
```
POST /ai/metadata
```
Edit PDF properties.

**Request:**
```json
{
  "file": "base64_encoded_pdf",
  "title": "New Title",
  "author": "Author Name",
  "subject": "Subject",
  "keywords": ["keyword1", "keyword2"]
}
```

## Error Codes

| Code | Error | Meaning |
|------|-------|---------|
| 400  | Bad Request | Missing or invalid parameters |
| 401  | Unauthorized | Authentication failed |
| 403  | Forbidden | Insufficient permissions/subscription |
| 429  | Too Many Requests | Rate limit exceeded |
| 500  | Internal Error | Server processing error |

## Examples

### cURL

```bash
# Health check
curl https://api.pdfilio.com/v1/health

# Summarize PDF
curl -X POST https://api.pdfilio.com/v1/summarize \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "file": "base64_encoded_pdf"
  }'

# Chat with PDF
curl -X POST https://api.pdfilio.com/v1/ai/chat \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "file": "base64_encoded_pdf",
    "question": "What is the main topic?"
  }'
```

### JavaScript/Node.js

```javascript
const response = await fetch('https://api.pdfilio.com/v1/summarize', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  },
  body: JSON.stringify({
    file: base64EncodedPDF
  })
});

const data = await response.json();
```

### Python

```python
import requests

response = requests.post(
    'https://api.pdfilio.com/v1/summarize',
    headers={'Authorization': f'Bearer {token}'},
    json={'file': base64_pdf}
)

result = response.json()
```

## Status Codes

- `200 OK` - Request successful
- `201 Created` - Resource created
- `400 Bad Request` - Invalid parameters
- `401 Unauthorized` - Auth required
- `403 Forbidden` - Access denied
- `429 Too Many Requests` - Rate limited
- `500 Server Error` - Processing failed

## Support

For API issues or support, contact: api-support@pdfilio.com

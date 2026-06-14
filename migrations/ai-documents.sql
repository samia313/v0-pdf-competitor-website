-- AI Document Assistant Tables

-- Store uploaded documents for AI analysis
CREATE TABLE IF NOT EXISTS ai_documents (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL REFERENCES public."user"(id) ON DELETE CASCADE,
  fileName TEXT NOT NULL,
  fileSize INTEGER NOT NULL,
  fileContent BYTEA NOT NULL,
  uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  expiresAt TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES public."user"(id)
);

-- Store analysis results for each feature
CREATE TABLE IF NOT EXISTS ai_analyses (
  id SERIAL PRIMARY KEY,
  documentId INTEGER NOT NULL REFERENCES ai_documents(id) ON DELETE CASCADE,
  userId TEXT NOT NULL,
  featureType TEXT NOT NULL CHECK (featureType IN ('summarize', 'translate', 'extract', 'clauses', 'notes', 'flashcards')),
  targetLanguage TEXT,
  result TEXT NOT NULL,
  tokensUsed INTEGER,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES public."user"(id)
);

-- Track AI tool usage for premium users
CREATE TABLE IF NOT EXISTS ai_usage_tracking (
  id SERIAL PRIMARY KEY,
  userId TEXT NOT NULL,
  featureType TEXT NOT NULL,
  tokensUsed INTEGER,
  documentSize INTEGER,
  createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (userId) REFERENCES public."user"(id)
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_ai_documents_userId ON ai_documents(userId);
CREATE INDEX IF NOT EXISTS idx_ai_documents_uploadedAt ON ai_documents(uploadedAt);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_userId ON ai_analyses(userId);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_featureType ON ai_analyses(featureType);
CREATE INDEX IF NOT EXISTS idx_ai_analyses_documentId ON ai_analyses(documentId);
CREATE INDEX IF NOT EXISTS idx_ai_usage_tracking_userId ON ai_usage_tracking(userId);
CREATE INDEX IF NOT EXISTS idx_ai_usage_tracking_createdAt ON ai_usage_tracking(createdAt);

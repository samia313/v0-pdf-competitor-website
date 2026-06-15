'use client'

import { ToolSchema } from '@/lib/schema-generator'
import { generateAllSchemas } from '@/lib/schema-generator'

export function SchemaScripts({ tool }: { tool: ToolSchema }) {
  const schemas = generateAllSchemas(tool)
  const schemaJson = JSON.stringify({
    '@context': 'https://schema.org',
    '@graph': schemas
  })

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: schemaJson }}
    />
  )
}

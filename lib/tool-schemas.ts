import { ToolSchema } from './schema-generator'

export const toolSchemasData: Record<string, ToolSchema> = {
  'merge-pdf': {
    toolId: 'merge-pdf',
    toolName: 'Merge PDF',
    description: 'Merge multiple PDF files into one document',
    url: 'https://www.pdfilio.com/tools/merge-pdf',
    category: 'PDF Tools',
    faqs: [
      {
        question: 'How do I merge PDF files?',
        answer: 'Upload your PDF files, arrange them in the desired order, and click the Merge button. Your merged PDF will be ready to download instantly.'
      },
      {
        question: 'Is there a file size limit?',
        answer: 'No, PDFilio allows you to merge PDFs of any size. The process is fast and secure.'
      },
      {
        question: 'Are my files kept private?',
        answer: 'Yes, all files are automatically deleted from our servers after processing. Your privacy is our priority.'
      },
      {
        question: 'Can I merge more than 2 PDFs?',
        answer: 'Yes, you can merge as many PDF files as you need into a single document.'
      },
      {
        question: 'Do I need to install any software?',
        answer: 'No, PDFilio is a web-based tool. Simply access it from your browser with no downloads required.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload Files', text: 'Click the upload area or drag and drop your PDF files' },
      { position: 2, name: 'Arrange Order', text: 'Drag the PDF thumbnails to reorder them as needed' },
      { position: 3, name: 'Merge PDFs', text: 'Click the Merge button to combine all PDFs' },
      { position: 4, name: 'Download', text: 'Download your merged PDF file instantly' }
    ]
  },
  'split-pdf': {
    toolId: 'split-pdf',
    toolName: 'Split PDF',
    description: 'Extract and separate specific pages from PDF documents',
    url: 'https://www.pdfilio.com/tools/split-pdf',
    category: 'PDF Tools',
    faqs: [
      {
        question: 'How do I split a PDF?',
        answer: 'Upload your PDF, select the pages you want to extract, and click Split. Your new PDF will be created instantly.'
      },
      {
        question: 'Can I extract individual pages?',
        answer: 'Yes, you can select specific pages or page ranges to extract into a new PDF document.'
      },
      {
        question: 'What happens to my original file?',
        answer: 'Your original PDF remains unchanged. We create a new PDF with only the pages you selected.'
      },
      {
        question: 'How long does splitting take?',
        answer: 'Splitting is instant, usually completed within seconds regardless of file size.'
      },
      {
        question: 'Is splitting secure?',
        answer: 'Yes, all processing is done securely and your files are automatically deleted after processing.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload PDF', text: 'Upload the PDF file you want to split' },
      { position: 2, name: 'Select Pages', text: 'Choose which pages you want to extract' },
      { position: 3, name: 'Split Document', text: 'Click the Split button to separate pages' },
      { position: 4, name: 'Download Results', text: 'Download your split PDF files' }
    ]
  },
  'compress-pdf': {
    toolId: 'compress-pdf',
    toolName: 'Compress PDF',
    description: 'Reduce PDF file size while maintaining quality',
    url: 'https://www.pdfilio.com/tools/compress-pdf',
    category: 'PDF Tools',
    faqs: [
      {
        question: 'How much can you reduce PDF size?',
        answer: 'Typical compression reduces file size by 30-70% depending on the original content.'
      },
      {
        question: 'Will compression affect quality?',
        answer: 'PDFilio uses smart compression that maintains readability while significantly reducing file size.'
      },
      {
        question: 'What is the maximum file size to compress?',
        answer: 'There is no file size limit. You can compress PDFs of any size.'
      },
      {
        question: 'Why compress PDFs?',
        answer: 'Smaller files are easier to email, upload, and share. They also save storage space.'
      },
      {
        question: 'Is compression instant?',
        answer: 'Yes, compression usually takes just a few seconds depending on file size.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload PDF', text: 'Upload the PDF file you want to compress' },
      { position: 2, name: 'Select Quality', text: 'Choose compression level (high, medium, or low quality)' },
      { position: 3, name: 'Compress', text: 'Click Compress to reduce the file size' },
      { position: 4, name: 'Download', text: 'Download your compressed PDF' }
    ]
  },
  'rotate-pdf': {
    toolId: 'rotate-pdf',
    toolName: 'Rotate PDF',
    description: 'Rotate PDF pages 90, 180, or 270 degrees',
    url: 'https://www.pdfilio.com/tools/rotate-pdf',
    category: 'PDF Tools',
    faqs: [
      {
        question: 'How do I rotate PDF pages?',
        answer: 'Upload your PDF, select the pages to rotate, choose the angle, and click Rotate.'
      },
      {
        question: 'Can I rotate specific pages?',
        answer: 'Yes, you can rotate individual pages or all pages in your PDF.'
      },
      {
        question: 'What rotation angles are available?',
        answer: 'You can rotate pages 90 degrees clockwise, 180 degrees, or 270 degrees clockwise.'
      },
      {
        question: 'Will rotation save permanently?',
        answer: 'Yes, when you download the PDF, all rotations are permanently applied.'
      },
      {
        question: 'Is the process instant?',
        answer: 'Yes, rotation is instant and your PDF will be ready to download immediately.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload PDF', text: 'Upload your PDF file' },
      { position: 2, name: 'Select Pages', text: 'Choose which pages to rotate' },
      { position: 3, name: 'Choose Angle', text: 'Select 90, 180, or 270 degrees' },
      { position: 4, name: 'Download', text: 'Download your rotated PDF' }
    ]
  },
  'chat-with-pdf': {
    toolId: 'chat-with-pdf',
    toolName: 'Chat with PDF',
    description: 'Ask questions about your PDF and get AI-powered answers',
    url: 'https://www.pdfilio.com/tools/chat-with-pdf',
    category: 'AI Tools',
    faqs: [
      {
        question: 'How does AI PDF chat work?',
        answer: 'Upload your PDF and ask questions about its content. Our AI reads the document and provides accurate answers.'
      },
      {
        question: 'What types of documents can I chat about?',
        answer: 'You can chat about any PDF including reports, contracts, research papers, manuals, and more.'
      },
      {
        question: 'Is my PDF data stored?',
        answer: 'No, your PDF is processed securely and automatically deleted after your chat session ends.'
      },
      {
        question: 'How accurate are the AI answers?',
        answer: 'The AI carefully reads your PDF and provides answers based directly on the document content.'
      },
      {
        question: 'Can I ask follow-up questions?',
        answer: 'Yes, you can have a full conversation with AI about your PDF document.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload PDF', text: 'Upload the PDF you want to chat about' },
      { position: 2, name: 'Ask Question', text: 'Type your question about the PDF content' },
      { position: 3, name: 'Get Answer', text: 'AI analyzes the PDF and provides an answer' },
      { position: 4, name: 'Follow Up', text: 'Ask more questions in the chat' }
    ]
  },
  'pdf-summary': {
    toolId: 'pdf-summary',
    toolName: 'PDF Summary',
    description: 'Get AI-powered summaries of your PDF documents',
    url: 'https://www.pdfilio.com/tools/pdf-summary',
    category: 'AI Tools',
    faqs: [
      {
        question: 'How does PDF summary work?',
        answer: 'Upload your PDF and our AI automatically generates a concise summary of the key points.'
      },
      {
        question: 'How long is the summary?',
        answer: 'Summaries are typically 20-30% of the original document length, highlighting only key information.'
      },
      {
        question: 'What document types can be summarized?',
        answer: 'Any PDF can be summarized including reports, articles, books, contracts, and more.'
      },
      {
        question: 'Is the summary accurate?',
        answer: 'Our AI technology ensures accurate summaries that capture the most important information.'
      },
      {
        question: 'Can I copy the summary?',
        answer: 'Yes, you can copy, download, or share the summary as needed.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload PDF', text: 'Upload the document you want summarized' },
      { position: 2, name: 'Process', text: 'AI analyzes your PDF to identify key points' },
      { position: 3, name: 'View Summary', text: 'Read the AI-generated summary' },
      { position: 4, name: 'Download', text: 'Save or share the summary' }
    ]
  },
  'ai-resume-analyzer': {
    toolId: 'ai-resume-analyzer',
    toolName: 'AI Resume Analyzer',
    description: 'Get professional feedback and scoring on your resume',
    url: 'https://www.pdfilio.com/tools/ai-resume-analyzer',
    category: 'AI Tools',
    faqs: [
      {
        question: 'How does resume analysis work?',
        answer: 'Upload your resume in PDF format and AI analyzes it for content, formatting, and effectiveness.'
      },
      {
        question: 'What score will I get?',
        answer: 'You receive a score from 0-100 based on formatting, keywords, and overall effectiveness.'
      },
      {
        question: 'What improvements does it suggest?',
        answer: 'AI provides specific suggestions to improve your resume for ATS systems and recruiters.'
      },
      {
        question: 'How can this help me get hired?',
        answer: 'A well-optimized resume is more likely to pass through ATS screening and get noticed by recruiters.'
      },
      {
        question: 'Is the feedback personalized?',
        answer: 'Yes, feedback is based on your specific resume content and industry standards.'
      }
    ],
    steps: [
      { position: 1, name: 'Upload Resume', text: 'Upload your resume as a PDF file' },
      { position: 2, name: 'Analyze', text: 'AI analyzes your resume content and formatting' },
      { position: 3, name: 'View Score', text: 'See your resume score and detailed feedback' },
      { position: 4, name: 'Improve', text: 'Make suggested improvements to your resume' }
    ]
  },
  'ai-invoice-generator': {
    toolId: 'ai-invoice-generator',
    toolName: 'AI Invoice Generator',
    description: 'Create professional invoices instantly with AI',
    url: 'https://www.pdfilio.com/tools/ai-invoice-generator',
    category: 'AI Tools',
    faqs: [
      {
        question: 'How does AI invoice generation work?',
        answer: 'Enter your business details and invoice information, and AI creates a professional invoice PDF.'
      },
      {
        question: 'Can I customize the invoice template?',
        answer: 'Yes, you can customize colors, logos, and layout to match your brand.'
      },
      {
        question: 'What information do I need?',
        answer: 'You need your business details, client information, and service/product details.'
      },
      {
        question: 'Can I save invoice templates?',
        answer: 'Yes, save your templates to quickly generate future invoices.'
      },
      {
        question: 'Is the invoice legally valid?',
        answer: 'Yes, our invoices include all necessary details and can be used for accounting and taxes.'
      }
    ],
    steps: [
      { position: 1, name: 'Enter Details', text: 'Input your business and client information' },
      { position: 2, name: 'Add Items', text: 'Add products or services with pricing' },
      { position: 3, name: 'Customize', text: 'Choose colors and layout preferences' },
      { position: 4, name: 'Download', text: 'Download and send your professional invoice' }
    ]
  }
}

export function getToolSchema(toolId: string): ToolSchema | undefined {
  return toolSchemasData[toolId]
}

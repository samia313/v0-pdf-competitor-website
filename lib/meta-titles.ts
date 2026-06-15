export const metaTitles = {
  // Main Pages
  home: "AI Document Workspace - Intelligent Document Platform | PDFilio",
  tools: "47+ AI Document Tools - Process, Analyze & Transform Documents | PDFilio",
  pricing: "Simple & Transparent Pricing | AI Document Workspace | PDFilio",
  blog: "Document Processing Tips & AI Insights | PDFilio Blog",
  about: "About PDFilio | The Intelligent Document Workspace Platform",
  contact: "Contact PDFilio | Get Support for Document Processing",
  faq: "FAQ | AI Document Workspace Frequently Asked Questions",
  
  // PDF Conversion Tools
  mergePdf: "Merge PDF Documents Online | AI-Powered Merging | PDFilio",
  splitPdf: "Split PDF Pages Online | Intelligent Page Separation | PDFilio",
  compressPdf: "Compress PDF Size Online | AI Optimization | PDFilio",
  rotatePdf: "Rotate PDF Pages Online | Quick Page Adjustment | PDFilio",
  removePages: "Remove PDF Pages Online | Intelligent Deletion | PDFilio",
  organizePdf: "Organize PDF Documents | Rearrange Pages Instantly | PDFilio",
  addPageNumbers: "Add Page Numbers to PDF | Auto Numbering | PDFilio",
  addWatermark: "Add Watermark to PDF | Protect Documents | PDFilio",
  editPdf: "Edit PDF Online | Modify Content Easily | PDFilio",
  signPdf: "Sign PDF Documents Online | Digital Signatures | PDFilio",
  protectPdf: "Protect PDF Documents | Encryption & Security | PDFilio",
  unlockPdf: "Unlock PDF Online | Remove Protection | PDFilio",
  
  // Image to PDF
  jpgToPdf: "JPG to PDF Converter | Image Processing | PDFilio",
  pngToPdf: "PNG to PDF Converter | Transform Images | PDFilio",
  webpToPdf: "WEBP to PDF Converter | Modern Format Support | PDFilio",
  imageToPdf: "Image to PDF Converter | Batch Processing | PDFilio",
  
  // PDF to Image
  pdfToJpg: "PDF to JPG Converter | Extract Images | PDFilio",
  pdfToPng: "PDF to PNG Converter | High-Quality Export | PDFilio",
  pdfToWebp: "PDF to WEBP Converter | Modern Format | PDFilio",
  
  // Office Conversions
  wordToPdf: "Word to PDF Converter | DOC/DOCX Processing | PDFilio",
  pdfToWord: "PDF to Word Converter | DOCX Export | PDFilio",
  excelToPdf: "Excel to PDF Converter | Spreadsheet Processing | PDFilio",
  pdfToExcel: "PDF to Excel Converter | Data Extraction | PDFilio",
  pptToPdf: "PowerPoint to PDF Converter | Presentation Support | PDFilio",
  pdfToPpt: "PDF to PowerPoint | PPTX Export | PDFilio",
  htmlToPdf: "HTML to PDF Converter | Web Content Processing | PDFilio",
  
  // Other Formats
  pdfToTxt: "PDF to Text Converter | Extract Content | PDFilio",
  svgToPdf: "SVG to PDF Converter | Vector Support | PDFilio",
  
  // AI Features - Unified branding
  aiSummarizer: "AI PDF Summarizer | Intelligent Summary Generation | PDFilio",
  translatePdf: "AI PDF Translator | Multi-Language Support | PDFilio",
  aiDocumentAssistant: "AI Document Assistant | Intelligent Analysis | PDFilio",
  
  // AI Features - Chat & Analysis
  chatWithPdf: "Chat with Documents | AI Document Q&A | PDFilio",
  pdfSummary: "AI Document Summary | Instant Insights | PDFilio",
  pdfTranslation: "AI Document Translation | Global Support | PDFilio",
  ocrTextExtraction: "OCR Document Scanning | Text Extraction | PDFilio",
  aiResumeAnalyzer: "AI Resume Analyzer | Career Insights | PDFilio",
  aiContractReader: "AI Contract Analysis | Legal Document Review | PDFilio",
  
  // AI Features - Creation
  aiInvoiceGenerator: "AI Invoice Creator | Professional Documents | PDFilio",
  aiCoverLetterGen: "AI Cover Letter Writer | Career Tools | PDFilio",
  aiStudyNotesGenerator: "AI Study Notes Generator | Learning Tools | PDFilio",
  aiPdfQuizGen: "AI Quiz Generator | Assessment Tools | PDFilio",
  pdfMetadataEditor: "PDF Metadata Editor | Document Properties | PDFilio",
  
  // API Documentation
  apiDocs: "PDFilio API Documentation | Document Processing API",
}

// Function to get title by route
export function getMetaTitle(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaTitles
  return metaTitles[key] || "PDFilio - Free PDF Tools Online"
}

// Function to get description by route
export const metaDescriptions = {
  // Main Pages
  home: "Transform your workflow with AI Document Workspace. Process, analyze, and optimize documents with 47+ tools. Merge, convert, edit PDFs + AI-powered features. Secure, free, no installation needed.",
  tools: "Explore 47+ intelligent document tools. From conversion and editing to AI analysis. Process any document format with advanced features, secure infrastructure, and complete privacy control.",
  pricing: "Simple, transparent pricing for document processing. Free essential tools, affordable Pro plans, and custom Business solutions. Pay for what you use, cancel anytime.",
  blog: "Expert insights on document processing, AI workflows, and productivity tips. Learn best practices for managing documents efficiently with PDFilio's AI Workspace.",
  about: "PDFilio's AI Document Workspace - Making intelligent document processing accessible to everyone. Our mission is empowering users with secure, powerful, and easy-to-use tools.",
  contact: "Contact PDFilio support. Questions about document processing, features, or integrations? Our team responds quickly to help you succeed.",
  faq: "Frequently asked questions about PDFilio's AI Document Workspace. Learn about features, pricing, security, file handling, and more.",
  
  // PDF Conversion Tools
  mergepdf: "Merge multiple PDF documents into one with intelligent processing. Secure, instant results. Perfect for organizing and consolidating documents.",
  splitpdf: "Split PDF pages with precision. Extract specific pages or separate entire documents instantly. Great for document organization and distribution.",
  compresspdf: "Reduce PDF file sizes using AI optimization. Maintain quality while making files email-friendly and storage-efficient.",
  rotatepdf: "Rotate PDF pages to any angle. Correct orientations instantly. Perfect for scanned documents and image-based PDFs.",
  removepages: "Remove unwanted pages from PDFs. Clean up documents by deleting specific pages instantly.",
  organizepdf: "Rearrange PDF pages easily. Reorganize document structure by reordering pages in seconds.",
  addpagenumbers: "Add automatic page numbering to PDFs. Choose positioning, format, and styling for professional document presentation.",
  addwatermark: "Protect documents with text or image watermarks. Add branding or security marks instantly.",
  editpdf: "Edit PDF text, annotations, and content directly online. Modify documents without specialized software.",
  signpdf: "Add legally-valid digital signatures to PDF documents. Sign with confidence and compliance.",
  protectpdf: "Encrypt PDFs with passwords. Control permissions for editing, printing, and copying. Secure sensitive documents.",
  unlockpdf: "Remove password protection from PDFs instantly. Access protected documents with verified ownership.",
  
  // Image to PDF
  jpgtopdf: "Convert JPG images to high-quality PDF documents instantly. Perfect for scanning and document digitization.",
  pngtopdf: "Transform PNG images to PDF format. Preserve transparency and quality in your conversions.",
  webptopdf: "Convert modern WEBP image format to standard PDF. Support for cutting-edge web formats.",
  imagetopdf: "Combine multiple images into a single PDF. Perfect for creating image galleries and digital albums.",
  
  // PDF to Image
  pdftojpg: "Extract PDF pages as high-quality JPEG images. Perfect for sharing individual pages and web publishing.",
  pdftopng: "Convert PDF pages to PNG format with transparency support. Ideal for design and web projects.",
  pdftowebp: "Transform PDFs to modern WEBP format for web optimization. Smaller file sizes, better quality.",
  
  // Office Conversions
  wordtopdf: "Convert Word documents (DOC/DOCX) to PDF instantly. Preserve formatting and layout perfectly.",
  pdftoword: "Transform PDFs to editable Word documents (DOCX). Edit content and maintain structure.",
  exceltopdf: "Convert Excel spreadsheets (XLS/XLSX) to PDF format. Perfect for reports and sharing.",
  pdftoexcel: "Extract data from PDFs into editable Excel spreadsheets. Automate data processing workflows.",
  ppttopdf: "Convert PowerPoint presentations (PPT/PPTX) to PDF. Great for sharing and archiving slides.",
  pdftoppt: "Transform PDFs to editable PowerPoint presentations. Recreate slides and edit content.",
  htmltopdf: "Convert web pages and HTML content to PDF format. Capture web content for offline use.",
  
  // Other Formats
  pdftotxt: "Extract readable text from PDF documents instantly. Convert any PDF page to plain text.",
  svgtopdf: "Convert vector graphics (SVG) to standard PDF format. Preserve quality and scalability.",
  
  // AI Features
  aisummarizer: "AI-powered document summarization. Get key points and insights instantly. Save time reading and understanding documents.",
  translatepdf: "Translate PDFs to 10+ languages with AI. Break language barriers for global communication.",
  aidocumentassistant: "Intelligent document analysis and data extraction. Let AI understand and organize your document data.",
  
  // AI Features - Chat & Analysis
  chatwithpdf: "Ask questions about your documents and get instant AI-powered answers. Interactive document understanding.",
  pdfsummary: "Get automatic AI summaries of any document. Extract key information instantly.",
  pdftranslation: "Translate entire PDFs to multiple languages with AI precision. Global document support.",
  ocrtextextraction: "Extract text from scanned PDFs and images using OCR technology. Convert images to editable text.",
  airesumeanalyzer: "AI-powered resume analysis. Get professional feedback, scoring, and improvement suggestions.",
  aicontractreader: "Analyze legal contracts and documents with AI. Identify key clauses and important terms automatically.",
  
  // AI Features - Creation
  aiinvoicegenerator: "Create professional invoices instantly with AI. Perfect for freelancers and small businesses.",
  aicoverlettergen: "Write personalized cover letters with AI assistance. Stand out in job applications.",
  aistudynotesgenerator: "Convert PDF documents into organized study notes. Perfect for students and learners.",
  aipdfquizgen: "Generate quiz questions and MCQs from PDF content automatically. Perfect for educators and training.",
  pdfmetadataeditor: "Edit PDF properties including title, author, subject, and keywords. Organize document metadata.",
}

export function getMetaDescription(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaDescriptions
  return metaDescriptions[key] || "Free PDF tools online. Merge, convert, edit, and process PDFs without software."
}

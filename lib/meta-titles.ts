export const metaTitles = {
  // Main Pages
  home: "Free PDF Tools Online | Merge, Convert, Edit & More | PDFilio",
  tools: "45+ Free PDF Tools Online | Convert, Merge, Edit PDFs | PDFilio",
  pricing: "Simple & Affordable PDF Tools Pricing | PDFilio Plans",
  blog: "PDF Tips & Tutorials | PDFilio Blog",
  about: "About PDFilio | Best Free PDF Tools Platform",
  contact: "Contact PDFilio | Get Support & Feedback",
  faq: "FAQ | Common Questions About PDFilio",
  
  // PDF Conversion Tools
  mergePdf: "Merge PDF Online Free | Combine PDF Files Instantly | PDFilio",
  splitPdf: "Split PDF Online Free | Separate PDF Pages | PDFilio",
  compressPdf: "Compress PDF Online Free | Reduce PDF Size | PDFilio",
  rotatePdf: "Rotate PDF Online Free | Turn PDF Pages | PDFilio",
  removePages: "Remove PDF Pages Online Free | Delete Pages | PDFilio",
  organizePdf: "Organize PDF Online Free | Rearrange PDF Pages | PDFilio",
  addPageNumbers: "Add Page Numbers to PDF Free | Number Pages Online | PDFilio",
  addWatermark: "Add Watermark to PDF Free | Protect PDFs Online | PDFilio",
  editPdf: "Edit PDF Online Free | Modify Text & Content | PDFilio",
  signPdf: "Sign PDF Online Free | Add Digital Signatures | PDFilio",
  protectPdf: "Protect PDF Online Free | Encrypt & Secure PDFs | PDFilio",
  unlockPdf: "Unlock PDF Online Free | Remove PDF Password | PDFilio",
  
  // Image to PDF
  jpgToPdf: "JPG to PDF Online Free | Convert Images to PDF | PDFilio",
  pngToPdf: "PNG to PDF Online Free | Convert PNG to PDF | PDFilio",
  webpToPdf: "WEBP to PDF Online Free | Convert WEBP Images | PDFilio",
  imageToPdf: "Image to PDF Online Free | Convert Multiple Images | PDFilio",
  
  // PDF to Image
  pdfToJpg: "PDF to JPG Online Free | Convert PDF to Images | PDFilio",
  pdfToPng: "PDF to PNG Online Free | Extract Images from PDF | PDFilio",
  pdfToWebp: "PDF to WEBP Online Free | Convert PDF Format | PDFilio",
  
  // Office Conversions
  wordToPdf: "Word to PDF Online Free | Convert DOC/DOCX to PDF | PDFilio",
  pdfToWord: "PDF to Word Online Free | Convert PDF to DOCX | PDFilio",
  excelToPdf: "Excel to PDF Online Free | Convert XLS to PDF | PDFilio",
  pdfToExcel: "PDF to Excel Online Free | Extract Data from PDF | PDFilio",
  pptToPdf: "PowerPoint to PDF Free | Convert PPT/PPTX to PDF | PDFilio",
  pdfToPpt: "PDF to PowerPoint Free | Convert PDF to PPTX | PDFilio",
  htmlToPdf: "HTML to PDF Online Free | Convert Web Pages | PDFilio",
  
  // Other Formats
  pdfToTxt: "PDF to Text Online Free | Extract Text from PDF | PDFilio",
  svgToPdf: "SVG to PDF Online Free | Convert SVG to PDF | PDFilio",
  
  // AI Features - Original 6
  aiSummarizer: "AI PDF Summarizer Free | Get Document Summaries Online | PDFilio",
  translatePdf: "Translate PDF Online Free | Multi-Language Translation | PDFilio",
  aiDocumentAssistant: "AI Document Assistant | Extract & Analyze Data | PDFilio",
  
  // AI Features - New 6
  chatWithPdf: "Chat with PDF AI | Ask Questions Online Free | PDFilio",
  pdfSummary: "PDF Summary Generator | AI Summaries Instant | PDFilio",
  pdfTranslation: "PDF Translation AI | 10+ Languages Online Free | PDFilio",
  ocrTextExtraction: "OCR PDF Extractor | Extract Text from Scans | PDFilio",
  aiResumeAnalyzer: "AI Resume Analyzer | Score & Improve Resume | PDFilio",
  aiContractReader: "AI Contract Reader | Analyze Legal Documents | PDFilio",
  
  // AI Features - New 5
  aiInvoiceGenerator: "AI Invoice Generator | Create Professional Invoices | PDFilio",
  aiCoverLetterGenerator: "AI Cover Letter Generator | Write Job Letters | PDFilio",
  aiStudyNotesGenerator: "AI Study Notes Generator | Convert PDFs to Notes | PDFilio",
  aiPdfQuizGenerator: "AI Quiz Generator | Create MCQ Tests from PDF | PDFilio",
  pdfMetadataEditor: "PDF Metadata Editor | Edit Title & Author | PDFilio",
  
  // API Documentation
  apiDocs: "PDFilio API Documentation | RESTful PDF API",
}

// Function to get title by route
export function getMetaTitle(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaTitles
  return metaTitles[key] || "PDFilio - Free PDF Tools Online"
}

// Function to get description by route
export const metaDescriptions = {
  home: "Free online PDF tools for merging, converting, editing, and more. No registration required. Fast, secure, and easy to use.",
  tools: "Browse 45+ free PDF tools. Convert, merge, edit, compress PDFs and more. All tools are free to use online.",
  mergePdf: "Merge multiple PDF files into one. Upload files, rearrange pages, and download merged PDF instantly.",
  chatWithPdf: "Ask questions about your PDF documents using AI. Get instant answers from your PDFs without leaving PDFilio.",
  aiResumeAnalyzer: "Get professional feedback on your resume. AI-powered analysis with scoring and improvement suggestions.",
  aiInvoiceGenerator: "Create professional invoices instantly. AI-assisted invoice generation for freelancers and small businesses.",
}

export function getMetaDescription(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaDescriptions
  return metaDescriptions[key] || "Free PDF tools online. Merge, convert, edit, and process PDFs without software."
}

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
  // Main Pages
  home: "Free PDF tools online to merge, convert, edit, split, and process PDFs. No registration needed. Fast, secure, and easy to use.",
  tools: "Browse 45+ free PDF tools. Merge, convert, edit, compress, split PDFs and more. All tools online, no download required.",
  pricing: "Simple and transparent PDFilio pricing plans. Free basic tools, affordable Pro plan, and custom Business solutions for teams.",
  blog: "Learn PDF tips, tutorials, and best practices. Expert guides on document management, productivity, and PDF optimization.",
  about: "About PDFilio - Your trusted platform for free, secure PDF tools. Our mission is making PDF editing accessible to everyone.",
  contact: "Contact PDFilio support team. Send feedback, report issues, or get help with our PDF tools. We respond quickly.",
  faq: "Frequently asked questions about PDFilio. Find answers about pricing, features, security, file limits, and more.",
  
  // PDF Conversion Tools
  mergepdf: "Merge PDF files online for free with PDFilio. Combine multiple PDF documents securely without registration.",
  splitpdf: "Split PDF online free. Extract individual pages from PDFs instantly. No software download needed.",
  compresspdf: "Compress PDF online free. Reduce PDF file size while maintaining quality. Perfect for email or storage.",
  rotatepdf: "Rotate PDF pages online free. Turn PDF pages 90, 180, or 270 degrees instantly. No registration required.",
  removepages: "Remove PDF pages online free. Delete unwanted pages from your PDF documents easily.",
  organizepdf: "Organize PDF pages online free. Rearrange, delete, or combine PDF pages in seconds.",
  addpagenumbers: "Add page numbers to PDF online free. Number pages automatically with custom formatting options.",
  addwatermark: "Add watermark to PDF online free. Protect your documents with text or image watermarks.",
  editpdf: "Edit PDF online free. Modify text, add annotations, and customize PDF content without software.",
  signpdf: "Sign PDF online free. Add digital signatures to documents securely and legally.",
  protectpdf: "Protect PDF online free. Encrypt PDFs with passwords and restrict editing, printing, and copying.",
  unlockpdf: "Unlock PDF online free. Remove password protection from PDF files instantly and securely.",
  
  // Image to PDF
  jpgtopdf: "Convert JPG to PDF online free. Turn images into high-quality PDF documents instantly.",
  pngtopdf: "Convert PNG to PDF online free. Create PDFs from PNG images without losing quality.",
  webptopdf: "Convert WEBP to PDF online free. Transform WEBP images to standard PDF format.",
  imagetopdf: "Convert images to PDF online free. Combine multiple images into a single PDF file.",
  
  // PDF to Image
  pdftojpg: "Convert PDF to JPG online free. Extract pages as high-quality JPEG images instantly.",
  pdftopng: "Convert PDF to PNG online free. Save PDF pages as transparent PNG images.",
  pdftowebp: "Convert PDF to WEBP online free. Transform PDF pages to modern WEBP format.",
  
  // Office Conversions
  wordtopdf: "Convert Word to PDF online free. Transform DOC and DOCX files to PDF format instantly.",
  pdftoword: "Convert PDF to Word online free. Transform PDFs to editable DOCX files instantly.",
  exceltopdf: "Convert Excel to PDF online free. Transform XLS and XLSX spreadsheets to PDF.",
  pdftoexcel: "Convert PDF to Excel online free. Extract data from PDFs to editable spreadsheets.",
  ppttopdf: "Convert PowerPoint to PDF online free. Transform PPT and PPTX presentations to PDF.",
  pdftoppt: "Convert PDF to PowerPoint online free. Transform PDFs to editable PPTX files.",
  htmltopdf: "Convert HTML to PDF online free. Transform web pages and HTML content to PDF.",
  
  // Other Formats
  pdftotxt: "Extract text from PDF online free. Convert PDF pages to plain text instantly.",
  svgtopdf: "Convert SVG to PDF online free. Transform vector graphics to standard PDF format.",
  
  // AI Features - Original 6
  aisummarizer: "AI PDF summarizer online free. Get automatic summaries of documents instantly. Save time reading.",
  translatepdf: "Translate PDF online free. Convert PDFs to 10+ languages instantly with AI-powered translation.",
  aidocumentassistant: "AI document assistant online. Extract structured data from PDFs automatically with AI.",
  
  // AI Features - New 6
  chatwithpdf: "Chat with PDF AI online free. Ask questions about your PDFs and get instant AI-powered answers.",
  pdfsummary: "PDF summary generator online free. Get AI-powered summaries of your documents instantly.",
  pdftranslation: "PDF translation AI online free. Translate PDFs to multiple languages instantly.",
  ocrtextextraction: "OCR text extraction online free. Extract text from scanned PDFs and images instantly.",
  airesumeanalyzer: "AI resume analyzer online free. Get professional feedback and score on your resume instantly.",
  aicontractreader: "AI contract reader online free. Analyze legal documents and identify key clauses instantly.",
  
  // AI Features - New 5
  aiinvoicegenerator: "AI invoice generator online free. Create professional invoices instantly for your business.",
  aicoverlettergen: "AI cover letter generator online free. Write personalized cover letters for job applications.",
  aistudynotesgenerator: "AI study notes generator online free. Convert PDFs to organized study notes instantly.",
  aipdfquizgen: "AI quiz generator online free. Create multiple choice questions from PDF content automatically.",
  pdfmetadataeditor: "PDF metadata editor online free. Edit title, author, subject, and keywords in PDFs instantly.",
}

export function getMetaDescription(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaDescriptions
  return metaDescriptions[key] || "Free PDF tools online. Merge, convert, edit, and process PDFs without software."
}

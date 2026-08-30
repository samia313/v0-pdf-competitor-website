export const metaTitles = {
  // Main Pages
  home: "Free PDF Tools Online & AI Document Tools | PDFilio",
  tools: "PDF & AI Document Tools Online | PDFilio",
  pricing: "Simple & Transparent Pricing | PDFilio",
  blog: "PDF & Document Guides, Tips & Insights | PDFilio Blog",
  about: "About PDFilio | Online PDF & Document Tools",
  contact: "Contact PDFilio | Document Tool Support",
  faq: "FAQ | PDFilio PDF & Document Tools",

  // PDF Conversion Tools
  mergePdf: "Merge PDF Documents Online | PDFilio",
  splitPdf: "Split PDF Pages Online | PDFilio",
  compressPdf: "Compress PDF Online | PDFilio",
  rotatePdf: "Rotate PDF Pages Online | PDFilio",
  removePages: "Remove Pages from PDF Online | PDFilio",
  organizePdf: "Organize PDF Pages Online | PDFilio",
  addPageNumbers: "Add Page Numbers to PDF Online | PDFilio",
  addWatermark: "Add Watermark to PDF Online | PDFilio",
  editPdf: "Edit PDF Online | PDFilio",
  signPdf: "Sign PDF Online | PDFilio",
  protectPdf: "Protect PDF with Password | PDFilio",
  unlockPdf: "Unlock PDF Online | PDFilio",

  // Image to PDF
  jpgToPdf: "JPG to PDF Converter Online | PDFilio",
  pngToPdf: "PNG to PDF Converter Online | PDFilio",
  webpToPdf: "WEBP to PDF Converter Online | PDFilio",
  imageToPdf: "Image to PDF Converter Online | PDFilio",

  // PDF to Image
  pdfToJpg: "PDF to JPG Converter Online | PDFilio",
  pdfToPng: "PDF to PNG Converter Online | PDFilio",
  pdfToWebp: "PDF to WEBP Converter Online | PDFilio",

  // Office Conversions
  wordToPdf: "Word to PDF Converter Online | PDFilio",
  pdfToWord: "PDF to Word Converter Online | PDFilio",
  excelToPdf: "Excel to PDF Converter Online | PDFilio",
  pdfToExcel: "PDF to Excel Converter Online | PDFilio",
  pptToPdf: "PowerPoint to PDF Converter Online | PDFilio",
  pdfToPpt: "PDF to PowerPoint Converter Online | PDFilio",
  htmlToPdf: "HTML to PDF Converter Online | PDFilio",

  // Other Formats
  pdfToTxt: "PDF to Text Converter Online | PDFilio",
  svgToPdf: "SVG to PDF Converter Online | PDFilio",

  // AI Features
  aiSummarizer: "AI PDF Summarizer | PDFilio",
  translatePdf: "AI PDF Translator | PDFilio",
  aiDocumentAssistant: "AI Document Assistant | PDFilio",
  chatWithPdf: "Chat with PDF & Documents | PDFilio",
  pdfSummary: "AI Document Summary | PDFilio",
  pdfTranslation: "AI Document Translation | PDFilio",
  ocrTextExtraction: "OCR Text Extraction Online | PDFilio",
  aiResumeAnalyzer: "AI Resume Analyzer | PDFilio",
  aiContractReader: "AI Contract Analysis | PDFilio",
  aiInvoiceGenerator: "AI Invoice Generator | PDFilio",
  aiCoverLetterGen: "AI Cover Letter Writer | PDFilio",
  aiStudyNotesGenerator: "AI Study Notes Generator | PDFilio",
  aiPdfQuizGen: "AI PDF Quiz Generator | PDFilio",
  pdfMetadataEditor: "PDF Metadata Editor | PDFilio",

  // API Documentation
  apiDocs: "PDFilio API Documentation | Document Processing API",
}

export function getMetaTitle(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaTitles
  return metaTitles[key] || "PDFilio - Free PDF Tools Online"
}

export const metaDescriptions = {
  // Main Pages
  home: "Use online PDF tools to merge, split, compress, convert, edit, and organize documents. PDFilio also offers AI-assisted document features with clear tool-specific processing information.",
  tools: "Explore PDF and AI document tools for conversion, editing, organization, OCR, extraction, and document analysis. Choose the tool that fits your workflow.",
  pricing: "View PDFilio plans for document processing, advanced features, and API access. Compare available options and choose the plan that fits your needs.",
  blog: "Practical guides and insights about PDF tools, document workflows, file conversion, OCR, and AI-assisted document processing.",
  about: "Learn about PDFilio, an online platform for PDF and document workflows including conversion, editing, organization, OCR, and AI-assisted features.",
  contact: "Contact PDFilio for questions about PDF tools, document processing, features, billing, or integrations.",
  faq: "Find answers about PDFilio tools, pricing, document processing, file handling, privacy, and common PDF workflows.",

  // PDF Conversion Tools
  mergepdf: "Combine multiple PDF files into one document online. Upload your files, arrange them as needed, and create a single PDF.",
  splitpdf: "Split a PDF into separate files or extract selected pages online. Choose the pages you need and create new PDF files.",
  compresspdf: "Reduce PDF file size online while aiming to preserve useful document quality. Prepare PDFs for sharing, storage, or upload.",
  rotatepdf: "Rotate PDF pages online to correct document orientation. Process selected pages and create an updated PDF.",
  removepages: "Remove unwanted pages from a PDF online. Select the pages to delete and create a cleaned document.",
  organizepdf: "Rearrange and organize PDF pages online. Change page order to create a better-structured document.",
  addpagenumbers: "Add page numbers to PDF documents online. Configure the placement and numbering format for your document.",
  addwatermark: "Add a text or image watermark to a PDF online for branding, identification, or document handling workflows.",
  editpdf: "Edit supported PDF content online, including document elements and annotations where available.",
  signpdf: "Add signatures to supported PDF documents online. Review the tool's workflow and options before signing.",
  protectpdf: "Protect a PDF with a password and available document permissions. Use the tool to help control access to your file.",
  unlockpdf: "Unlock supported PDF files when you have permission to access them. Processing depends on the document and its protection settings.",

  // Image to PDF
  jpgtopdf: "Convert JPG images to PDF online. Create PDF documents from one or more supported image files.",
  pngtopdf: "Convert PNG images to PDF online while preserving supported image content and quality.",
  webptopdf: "Convert WEBP images to PDF online for document sharing and archiving workflows.",
  imagetopdf: "Convert supported images into a PDF document online. Combine multiple images into a single file where supported.",

  // PDF to Image
  pdftojpg: "Convert PDF pages to JPG images online for sharing, previews, and supported image workflows.",
  pdftopng: "Convert PDF pages to PNG images online for supported design, preview, and document workflows.",
  pdftowebp: "Convert PDF pages to WEBP images online for supported web and image workflows.",

  // Office Conversions
  wordtopdf: "Convert supported Word documents to PDF online while preserving available document structure and formatting.",
  pdftoword: "Convert supported PDF documents to editable Word files online. Results can vary depending on the source PDF structure.",
  exceltopdf: "Convert supported Excel spreadsheets to PDF online for sharing, presentation, and document workflows.",
  pdftoexcel: "Convert supported PDF tables and content into Excel format online. Results depend on the source document structure.",
  ppttopdf: "Convert supported PowerPoint presentations to PDF online for sharing and document workflows.",
  pdftoppt: "Convert supported PDF content to PowerPoint format online. Results depend on the source PDF structure.",
  htmltopdf: "Convert supported HTML content to PDF online for saving and sharing web-based documents.",

  // Other Formats
  pdftotxt: "Extract text from supported PDF documents and convert it to plain text online.",
  svgtopdf: "Convert supported SVG graphics to PDF online while preserving available vector content.",

  // AI Features
  aisummarizer: "Use AI-assisted summarization to identify key information from supported documents.",
  translatepdf: "Translate supported PDF content with AI assistance into available languages. Review results for important documents.",
  aidocumentassistant: "Use AI-assisted document analysis for supported files, including summarization, extraction, notes, and other document tasks.",
  chatwithpdf: "Ask questions about supported documents and receive AI-assisted answers based on the available document content.",
  pdfsummary: "Generate an AI-assisted summary of supported documents and review the resulting key information.",
  pdftranslation: "Translate supported document content with AI assistance into available languages.",
  ocrtextextraction: "Extract text from supported scanned documents and images using OCR technology.",
  airesumeanalyzer: "Analyze a supported resume with AI assistance and receive feedback on its content and structure.",
  aicontractreader: "Review supported contracts with AI assistance to identify clauses, terms, and areas for closer review. This is not legal advice.",
  aiinvoicegenerator: "Create invoice drafts with AI assistance for supported business workflows. Review all generated details before use.",
  aicoverlettergen: "Create a personalized cover-letter draft with AI assistance and review it before submitting an application.",
  aistudynotesgenerator: "Turn supported document content into organized study notes with AI assistance.",
  aipdfquizgen: "Generate quiz questions from supported PDF content with AI assistance for study and training workflows.",
  pdfmetadataeditor: "View and edit supported PDF metadata such as title, author, subject, and keywords.",
}

export function getMetaDescription(route: string): string {
  const key = route.replace(/[/-]/g, '').toLowerCase() as keyof typeof metaDescriptions
  return metaDescriptions[key] || "Free PDF tools online for merging, converting, editing, compressing, and organizing supported documents."
}
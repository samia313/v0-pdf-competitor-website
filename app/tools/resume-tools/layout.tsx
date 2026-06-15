import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume Tools | Resume Analyzer, Builder & Cover Letter Generator | PDFilio',
  description: 'Professional resume tools to build, analyze, and improve your job applications. Get AI feedback, create ATS-friendly resumes, generate cover letters.',
  keywords: 'resume, resume analyzer, cover letter, job application, career, hiring',
}

export default function ResumeToolsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

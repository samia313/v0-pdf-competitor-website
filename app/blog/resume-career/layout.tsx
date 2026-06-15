import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resume & Career Guide | ATS Optimization, Resume Builder & Cover Letters | PDFilio',
  description: 'Complete resume guides for job success. Learn ATS optimization, resume building, cover letter writing, and career strategies to land your dream job.',
  keywords: 'ATS resume, resume optimization, resume builder, cover letter, job application, career',
}

export default function ResumeCareerLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Terms of Service - ClixPDF',
  description: 'Read the terms of service for using ClixPDF PDF tools.',
}

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Terms of Service
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="lead text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using ClixPDF, you agree to be bound by these Terms of Service.
              If you do not agree to these terms, please do not use our services.
            </p>

            <h2>Description of Service</h2>
            <p>
              ClixPDF provides free online PDF tools including but not limited to:
            </p>
            <ul>
              <li>PDF merging and splitting</li>
              <li>PDF compression</li>
              <li>PDF conversion (to and from various formats)</li>
              <li>PDF editing and watermarking</li>
              <li>PDF security features</li>
            </ul>

            <h2>User Responsibilities</h2>
            <p>You agree to:</p>
            <ul>
              <li>Use the service only for lawful purposes</li>
              <li>Not upload files that contain malware or viruses</li>
              <li>Not attempt to circumvent any security measures</li>
              <li>Not use the service to process illegal content</li>
              <li>Respect intellectual property rights of others</li>
            </ul>

            <h2>Intellectual Property</h2>
            <p>
              You retain all rights to the files you upload and process. We do not claim any
              ownership of your content. The ClixPDF website, logo, and tools are protected
              by intellectual property laws.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              ClixPDF is provided &quot;as is&quot; without warranties of any kind. We do not guarantee:
            </p>
            <ul>
              <li>Uninterrupted or error-free service</li>
              <li>Accuracy of results</li>
              <li>Compatibility with all PDF files</li>
              <li>Data preservation in case of errors</li>
            </ul>

            <h2>Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, ClixPDF shall not be liable for any
              indirect, incidental, special, or consequential damages arising from your use
              of our services.
            </p>

            <h2>File Processing</h2>
            <p>
              Most file processing occurs directly in your browser. For operations that require
              server processing, files are processed and deleted immediately after completion.
              We recommend keeping backups of important files before processing.
            </p>

            <h2>Advertising</h2>
            <p>
              Our free service is supported by advertising. By using ClixPDF, you consent
              to the display of advertisements. Ad blockers may interfere with service functionality.
            </p>

            <h2>Service Modifications</h2>
            <p>
              We reserve the right to modify, suspend, or discontinue any part of our service
              at any time without prior notice.
            </p>

            <h2>Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with applicable laws,
              without regard to conflict of law principles.
            </p>

            <h2>Contact</h2>
            <p>
              For questions about these Terms of Service, please contact us through our contact page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

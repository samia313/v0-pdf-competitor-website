import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy | PDFilio',
  description: 'Learn how PDFilio collects, uses, protects, and deletes information when you use our PDF and document services.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">Privacy Policy</h1>
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="lead text-muted-foreground text-lg">Last updated: August 31, 2026</p>

            <h2>Your Privacy</h2>
            <p>
              PDFilio respects your privacy. This policy explains what information may be collected when you use our website and services, how it is used, and the choices available to you.
            </p>

            <h2>Information We Collect</h2>
            <h3>Account and Contact Information</h3>
            <p>
              If you create an account, purchase a plan, or contact us, we may collect information such as your name, email address, account details, and information needed to provide the requested service.
            </p>

            <h3>Files and Documents</h3>
            <p>
              File handling depends on the tool you use. Some tools can process files locally in your browser, while other features require secure server-side processing. When a file is sent to our servers, it is used to provide the requested operation and is handled according to the applicable service workflow. Do not upload documents containing information you are not authorized to process.
            </p>

            <h3>Usage Information</h3>
            <p>
              We may collect technical and usage information such as browser type, device type, referring page, pages viewed, approximate usage information, and IP address or similar technical identifiers where necessary for security, analytics, fraud prevention, and service operation.
            </p>

            <h2>How We Use Information</h2>
            <ul>
              <li>To provide, maintain, and improve PDFilio services.</li>
              <li>To process requests and provide customer support.</li>
              <li>To operate accounts, subscriptions, billing, and security features.</li>
              <li>To understand website usage and improve performance.</li>
              <li>To detect abuse, fraud, security threats, and technical problems.</li>
              <li>To display advertising where advertising is enabled.</li>
            </ul>

            <h2>Advertising</h2>
            <p>
              PDFilio may use third-party advertising services, including Google AdSense, to display advertisements. These services may use cookies or similar technologies to measure advertising performance and, where permitted by applicable law and user choices, personalize ads. Advertising settings may vary by region and browser.
            </p>
            <p>
              You can manage Google advertising personalization through Google&apos;s advertising settings. You can also manage or disable cookies through your browser settings, although some website functionality may be affected.
            </p>

            <h2>Cookies and Similar Technologies</h2>
            <p>We may use:</p>
            <ul>
              <li><strong>Essential technologies:</strong> required for authentication, security, and core functionality.</li>
              <li><strong>Analytics technologies:</strong> used to understand traffic and service usage where enabled.</li>
              <li><strong>Advertising technologies:</strong> used by advertising partners where advertising is enabled and permitted.</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>
              Depending on the features you use, PDFilio may rely on third-party providers for hosting, analytics, authentication, payments, email, advertising, AI processing, or other infrastructure. These providers may process information only as needed to provide their services and under their own applicable privacy terms.
            </p>

            <h2>Data Security</h2>
            <p>
              We use reasonable technical and organizational safeguards designed to protect information against unauthorized access, alteration, disclosure, or destruction. No internet service can guarantee absolute security.
            </p>

            <h2>Data Retention and File Deletion</h2>
            <p>
              Retention depends on the specific service and processing workflow. Where files are processed on our servers, they are intended to be removed according to the applicable tool or service retention policy. We do not claim that every PDFilio tool uses the same processing method or retention period; the relevant tool documentation takes precedence.
            </p>

            <h2>Your Choices and Rights</h2>
            <p>Depending on your location and applicable law, you may have rights to:</p>
            <ul>
              <li>Request access to personal information we hold about you.</li>
              <li>Request correction or deletion of eligible personal information.</li>
              <li>Object to or restrict certain processing.</li>
              <li>Withdraw consent where processing is based on consent.</li>
              <li>Manage certain cookie and advertising preferences.</li>
            </ul>
            <p>To make a privacy request, contact us through our contact page.</p>

            <h2>Children&apos;s Privacy</h2>
            <p>
              PDFilio is not directed to children under 13, and we do not knowingly collect personal information from children under 13.
            </p>

            <h2>International Users</h2>
            <p>
              PDFilio may be accessed from different countries, and information may be processed in countries where our service providers operate. Where required, we use appropriate safeguards for applicable international data transfers.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this policy when our services, technology, or legal requirements change. The latest version will be published on this page with an updated date.
            </p>

            <h2>Contact Us</h2>
            <p>
              For privacy questions or requests, please contact PDFilio through our contact page.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

import { Header } from '@/components/header'
import { Footer } from '@/components/footer'

export const metadata = {
  title: 'Privacy Policy - pdfilio',
  description: 'Learn how pdfilio protects your privacy and handles your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-12">
        <div className="container mx-auto px-4 max-w-3xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            Privacy Policy
          </h1>
          
          <div className="prose prose-neutral dark:prose-invert max-w-none">
            <p className="lead text-muted-foreground text-lg">
              Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </p>

            <h2>Your Privacy is Our Priority</h2>
            <p>
              At pdfilio, we are committed to protecting your privacy. This Privacy Policy explains
              how we collect, use, and safeguard your information when you use our website and services.
            </p>

            <h2>Information We Collect</h2>
            <h3>Files You Upload</h3>
            <p>
              When you use our PDF tools, your files are processed directly in your browser.
              We do not upload, store, or have access to your files on our servers unless
              specifically required for certain operations.
            </p>

            <h3>Automatically Collected Information</h3>
            <ul>
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Referring website</li>
              <li>Pages visited and time spent</li>
              <li>IP address (anonymized)</li>
            </ul>

            <h2>How We Use Your Information</h2>
            <ul>
              <li>To provide and improve our PDF tools</li>
              <li>To analyze website traffic and usage patterns</li>
              <li>To display relevant advertisements</li>
              <li>To ensure the security of our services</li>
            </ul>

            <h2>Advertising</h2>
            <p>
              We use Google AdSense to display advertisements on our website. Google may use
              cookies to serve ads based on your prior visits to our website or other websites.
              You can opt out of personalized advertising by visiting{' '}
              <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer">
                Google Ads Settings
              </a>.
            </p>

            <h2>Cookies</h2>
            <p>
              We use cookies to enhance your experience on our website. These include:
            </p>
            <ul>
              <li><strong>Essential cookies:</strong> Required for the website to function</li>
              <li><strong>Analytics cookies:</strong> Help us understand how visitors use our site</li>
              <li><strong>Advertising cookies:</strong> Used to deliver relevant ads</li>
            </ul>

            <h2>Data Security</h2>
            <p>
              We implement industry-standard security measures to protect your information.
              All data transfers are encrypted using SSL/TLS technology.
            </p>

            <h2>Your Rights</h2>
            <p>You have the right to:</p>
            <ul>
              <li>Access your personal data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of personalized advertising</li>
              <li>Disable cookies in your browser settings</li>
            </ul>

            <h2>Third-Party Services</h2>
            <p>We use the following third-party services:</p>
            <ul>
              <li>Google Analytics for website analytics</li>
              <li>Google AdSense for advertising</li>
              <li>Vercel for hosting</li>
            </ul>

            <h2>Children&apos;s Privacy</h2>
            <p>
              Our services are not intended for children under 13. We do not knowingly collect
              personal information from children.
            </p>

            <h2>Changes to This Policy</h2>
            <p>
              We may update this Privacy Policy from time to time. We will notify you of any
              changes by posting the new policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through
              our contact page.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

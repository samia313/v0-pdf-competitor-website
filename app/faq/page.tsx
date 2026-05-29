import { Header } from '@/components/header'
import { Footer } from '@/components/footer'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MessageCircle } from 'lucide-react'

export const metadata = {
  title: 'FAQ - Frequently Asked Questions | PDFMaster',
  description: 'Find answers to commonly asked questions about PDFMaster PDF tools, pricing, and features.',
}

const faqs = [
  {
    category: 'General',
    questions: [
      {
        q: 'What is PDFMaster?',
        a: 'PDFMaster is a free online platform that provides powerful PDF tools to merge, split, compress, convert, and edit PDF files. Our tools are easy to use and work directly in your browser without any software installation.'
      },
      {
        q: 'Is PDFMaster free to use?',
        a: 'Yes! PDFMaster offers a free plan with access to all basic PDF tools. Free users can process up to 5 files per day with a maximum file size of 25MB. For unlimited access and advanced features, you can upgrade to our Premium or Business plans.'
      },
      {
        q: 'Do I need to create an account?',
        a: 'No account is required to use our basic PDF tools. However, creating a free account gives you benefits like file history, higher daily limits, and the ability to save your preferences.'
      },
      {
        q: 'Is my data safe with PDFMaster?',
        a: 'Absolutely! We take your privacy seriously. All files are processed securely and automatically deleted from our servers within 1 hour. We use encryption for all file transfers and never share your files with third parties.'
      },
    ]
  },
  {
    category: 'PDF Tools',
    questions: [
      {
        q: 'How do I merge PDF files?',
        a: 'Simply go to our Merge PDF tool, upload the PDF files you want to combine, arrange them in your preferred order using drag and drop, and click "Merge PDFs". Your merged file will be ready to download in seconds.'
      },
      {
        q: 'What is the maximum file size I can upload?',
        a: 'Free users can upload files up to 25MB. Premium users enjoy a 4GB file size limit, and Business users have a 10GB limit per file.'
      },
      {
        q: 'Which file formats do you support for conversion?',
        a: 'We support conversions between PDF and many popular formats including Word (.docx), Excel (.xlsx), PowerPoint (.pptx), JPG, PNG, and HTML. You can convert both to and from PDF.'
      },
      {
        q: 'Does compression reduce PDF quality?',
        a: 'Our compression tool is designed to significantly reduce file size while maintaining good visual quality. You can choose between different compression levels based on your needs - from maximum compression for smaller files to high quality for documents with important images.'
      },
    ]
  },
  {
    category: 'Premium Features',
    questions: [
      {
        q: 'What are the benefits of Premium?',
        a: 'Premium users enjoy unlimited PDF tasks, no advertisements, larger file sizes (up to 4GB), access to advanced tools like OCR and AI Summarizer, priority processing, and dedicated customer support.'
      },
      {
        q: 'What is included in the Business plan?',
        a: 'The Business plan includes everything in Premium plus team collaboration features for up to 10 members, 10GB file size limit, API access for developers, priority support, and custom branding options.'
      },
      {
        q: 'Can I cancel my subscription anytime?',
        a: 'Yes, you can cancel your subscription at any time. Your premium features will remain active until the end of your current billing period.'
      },
      {
        q: 'Do you offer refunds?',
        a: 'Yes, we offer a 7-day money-back guarantee. If you are not satisfied with our premium service, contact us within 7 days of purchase for a full refund.'
      },
    ]
  },
  {
    category: 'Payment',
    questions: [
      {
        q: 'What payment methods do you accept?',
        a: 'We accept JazzCash, Easypaisa, and direct bank transfers for Pakistani users. International users can pay via credit/debit cards through Stripe.'
      },
      {
        q: 'How do I pay with JazzCash or Easypaisa?',
        a: 'Select your plan, choose JazzCash or Easypaisa as your payment method, and follow the instructions to send payment to our account. After payment, upload your payment screenshot or send it to our WhatsApp for verification.'
      },
      {
        q: 'How long does payment verification take?',
        a: 'We typically verify payments within 1-2 hours during business hours. For urgent activations, contact us on WhatsApp for faster processing.'
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes, all payment information is handled securely. For card payments, we use Stripe which is PCI compliant. For mobile wallet payments, we never store your account credentials.'
      },
    ]
  },
  {
    category: 'Technical',
    questions: [
      {
        q: 'Which browsers are supported?',
        a: 'PDFMaster works on all modern browsers including Chrome, Firefox, Safari, and Edge. For the best experience, we recommend using the latest version of your browser.'
      },
      {
        q: 'Can I use PDFMaster on mobile devices?',
        a: 'Yes! PDFMaster is fully responsive and works on smartphones and tablets. You can access all our tools from any device with a web browser.'
      },
      {
        q: 'Why is my PDF taking long to process?',
        a: 'Processing time depends on file size and the type of operation. Large files or complex operations like OCR may take longer. Premium users enjoy priority processing for faster results.'
      },
      {
        q: 'What should I do if I encounter an error?',
        a: 'Try refreshing the page and uploading your file again. If the problem persists, make sure your file is not corrupted and is within the size limits. Contact our support team if you continue to experience issues.'
      },
    ]
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-muted-foreground">
              Find answers to common questions about PDFMaster
            </p>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-8">
            {faqs.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="text-2xl font-semibold text-foreground mb-4">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, index) => (
                    <AccordionItem key={index} value={`${categoryIndex}-${index}`}>
                      <AccordionTrigger className="text-left">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>

          {/* Still have questions */}
          <div className="mt-16 text-center p-8 bg-muted/50 rounded-2xl">
            <h2 className="text-2xl font-semibold text-foreground mb-4">
              Still have questions?
            </h2>
            <p className="text-muted-foreground mb-6">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg">
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Contact Support
                </Button>
              </Link>
              <a 
                href="https://wa.me/923450100172" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button size="lg" variant="outline" className="text-green-600 border-green-600 hover:bg-green-50">
                  WhatsApp Support
                </Button>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

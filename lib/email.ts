import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendOrderConfirmationEmail(data: {
  to: string
  customerName: string
  orderId: string
  planName: string
  amount: number
  paymentMethod: string
}) {
  try {
    await resend.emails.send({
      from: 'OrbixDocs <noreply@orbixdocs.com>',
      to: data.to,
      subject: `Order Confirmation - ${data.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .order-details { background: white; padding: 15px; border-radius: 8px; margin: 15px 0; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OrbixDocs</h1>
            </div>
            <div class="content">
              <h2>Order Confirmation</h2>
              <p>Dear ${data.customerName},</p>
              <p>Thank you for your order! We have received your payment request.</p>
              
              <div class="order-details">
                <h3>Order Details:</h3>
                <p><strong>Order ID:</strong> ${data.orderId}</p>
                <p><strong>Plan:</strong> ${data.planName}</p>
                <p><strong>Amount:</strong> Rs. ${data.amount.toLocaleString()}</p>
                <p><strong>Payment Method:</strong> ${data.paymentMethod}</p>
              </div>
              
              <p>Your order is being processed. Once we verify your payment, your subscription will be activated.</p>
              <p>If you have any questions, please contact us on WhatsApp: +92 345 0100172</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 OrbixDocs. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendPaymentVerifiedEmail(data: {
  to: string
  customerName: string
  orderId: string
  planName: string
  endDate: Date
}) {
  try {
    await resend.emails.send({
      from: 'OrbixDocs <noreply@orbixdocs.com>',
      to: data.to,
      subject: `Payment Verified - Welcome to OrbixDocs Premium!`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #4CAF50; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .success-box { background: #E8F5E9; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #4CAF50; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
            .cta-button { display: inline-block; background: #E53935; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; margin: 15px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Payment Verified!</h1>
            </div>
            <div class="content">
              <h2>Welcome to OrbixDocs Premium!</h2>
              <p>Dear ${data.customerName},</p>
              
              <div class="success-box">
                <p><strong>Great news!</strong> Your payment has been verified and your subscription is now active.</p>
              </div>
              
              <p><strong>Plan:</strong> ${data.planName}</p>
              <p><strong>Order ID:</strong> ${data.orderId}</p>
              <p><strong>Valid Until:</strong> ${data.endDate.toLocaleDateString()}</p>
              
              <p>You now have access to all premium features:</p>
              <ul>
                <li>Unlimited PDF conversions</li>
                <li>No ads</li>
                <li>OCR & AI features</li>
                <li>Priority support</li>
              </ul>
              
              <a href="https://orbixdocs.com" class="cta-button">Start Using Premium</a>
            </div>
            <div class="footer">
              <p>&copy; 2024 OrbixDocs. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

export async function sendPaymentRejectedEmail(data: {
  to: string
  customerName: string
  orderId: string
  reason: string
}) {
  try {
    await resend.emails.send({
      from: 'OrbixDocs <noreply@orbixdocs.com>',
      to: data.to,
      subject: `Payment Issue - Order ${data.orderId}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: #E53935; color: white; padding: 20px; text-align: center; }
            .content { padding: 20px; background: #f9f9f9; }
            .error-box { background: #FFEBEE; padding: 15px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #E53935; }
            .footer { text-align: center; padding: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>OrbixDocs</h1>
            </div>
            <div class="content">
              <h2>Payment Issue</h2>
              <p>Dear ${data.customerName},</p>
              
              <div class="error-box">
                <p>Unfortunately, we could not verify your payment for Order ${data.orderId}.</p>
                <p><strong>Reason:</strong> ${data.reason}</p>
              </div>
              
              <p>Please contact us on WhatsApp (+92 345 0100172) to resolve this issue.</p>
              <p>If this was a mistake, please send us your payment screenshot again.</p>
            </div>
            <div class="footer">
              <p>&copy; 2024 OrbixDocs. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    })
    return { success: true }
  } catch (error) {
    console.error('Email send error:', error)
    return { success: false, error }
  }
}

import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

export async function sendConfirmationEmail({ name, email, message, company, position }) {
  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: `Thank you for contacting me, ${name}! 🎉`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #14b8a6 0%, #0d9488 100%); padding: 30px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Thank You for Reaching Out! 🎉</h1>
          </div>
          
          <div style="background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px;">
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">Hi <strong>${name}</strong>,</p>
            
            <p style="font-size: 16px; color: #374151; line-height: 1.6;">
              Thank you for your message! I have received it and will review it soon. 
              I'll get back to you as quickly as possible.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #14b8a6; margin: 20px 0;">
              <h3 style="color: #14b8a6; margin-top: 0;">Your Message:</h3>
              <p style="color: #6b7280; line-height: 1.6;">${message}</p>
            </div>
            
            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0;">
            
            <h3 style="color: #374151;">Contact Information:</h3>
            <p style="color: #6b7280; line-height: 1.8;">
              📧 <strong>Email:</strong> <a href="mailto:${process.env.NEXT_PUBLIC_YOUR_EMAIL}" style="color: #14b8a6; text-decoration: none;">${process.env.NEXT_PUBLIC_YOUR_EMAIL}</a><br>
              🌐 <strong>Portfolio:</strong> <a href="${process.env.NEXT_PUBLIC_YOUR_WEBSITE}" style="color: #14b8a6; text-decoration: none;">${process.env.NEXT_PUBLIC_YOUR_WEBSITE}</a>
            </p>
            
            <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e5e7eb;">
              <p style="color: #374151; margin: 5px 0;">Best regards,</p>
              <p style="color: #374151; margin: 5px 0;"><strong>${process.env.NEXT_PUBLIC_YOUR_NAME}</strong></p>
              <p style="color: #6b7280; margin: 5px 0; font-size: 14px;">Full Stack Next.js Developer</p>
            </div>
          </div>
          
          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p>This is an automated confirmation email.</p>
          </div>
        </div>
      `,
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}

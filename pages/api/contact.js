import nodemailer from 'nodemailer';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const { name, email, message } = req.body;

    // Validate inputs
    if (!name || !email || !message) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    // Configure email transporter
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: process.env.EMAIL_SECURE === 'true',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    // Email template for user (confirmation)
    const userEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Thank You for Contacting PiRhoTech</title>
        <style>
          /* Base styles for better email client compatibility */
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f8f8;
          }
          
          /* Container styling */
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          }
          
          /* Header styling */
          .email-header {
            background-color: #18181b;
            color: #ffffff;
            padding: 30px 40px;
            text-align: center;
          }
          
          .email-header h1 {
            margin: 0;
            font-size: 28px;
            font-weight: 700;
            letter-spacing: -0.5px;
          }
          
          /* Logo section */
          .logo-container {
            text-align: center;
            margin-bottom: 15px;
          }
          
          .logo-text {
            font-size: 32px;
            font-weight: 800;
            color: #ffffff;
            letter-spacing: 1px;
          }
          
          /* Content styling */
          .email-content {
            padding: 40px;
            background-color: #ffffff;
          }
          
          .greeting {
            font-size: 20px;
            font-weight: 600;
            margin-bottom: 20px;
            color: #18181b;
          }
          
          .message-box {
            background-color: #f9f9fb;
            border-left: 4px solid #18181b;
            padding: 20px;
            margin: 25px 0;
            border-radius: 4px;
          }
          
          .message-text {
            white-space: pre-wrap;
            color: #444;
            font-size: 15px;
            line-height: 1.7;
          }
          
          /* Footer styling */
          .email-footer {
            background-color: #f3f4f6;
            padding: 30px 40px;
            text-align: center;
            color: #666;
            font-size: 14px;
            border-top: 1px solid #e5e7eb;
          }
          
          .company-name {
            font-weight: 700;
            color: #18181b;
          }
          
          .footer-links {
            margin-top: 15px;
          }
          
          .footer-link {
            color: #18181b;
            text-decoration: none;
            margin: 0 10px;
          }
          
          .footer-link:hover {
            text-decoration: underline;
          }
          
          /* Button styling */
          .cta-button {
            display: inline-block;
            background-color: #18181b;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 600;
            margin: 25px 0 15px;
            text-align: center;
          }
          
          .divider {
            height: 1px;
            background-color: #e5e7eb;
            margin: 30px 0;
          }
          
          /* Responsive adjustments */
          @media only screen and (max-width: 480px) {
            .email-container {
              width: 100% !important;
              border-radius: 0;
            }
            
            .email-header, .email-content, .email-footer {
              padding: 25px;
            }
            
            .email-header h1 {
              font-size: 24px;
            }
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <div class="logo-container">
              <div class="logo-text">PiRhoTech</div>
            </div>
            <h1>Thank You for Reaching Out!</h1>
          </div>
          
          <div class="email-content">
            <p class="greeting">Dear ${name},</p>
            
            <p>Thank you for contacting PiRhoTech. We've received your message and appreciate your interest in our services.</p>
            
            <p>Our team will review your inquiry and get back to you as soon as possible. In the meantime, here's a copy of your message:</p>
            
            <div class="message-box">
              <p class="message-text">${message}</p>
            </div>
            
            <p>If you have any additional questions or information to share, please don't hesitate to reply to this email.</p>
            
            <a href="https://pirhotech.com" class="cta-button">Explore Our Services</a>
            
            <div class="divider"></div>
            
            <p>Best regards,<br>
            <strong>The PiRhoTech Team</strong></p>
          </div>
          
          <div class="email-footer">
            <p>&copy; 2024 <span class="company-name">PiRhoTech</span>. All rights reserved.</p>
            <div class="footer-links">
              <a href="https://pirhotech.com" class="footer-link">Website</a>
              <a href="https://pirhotech.com/privacy" class="footer-link">Privacy Policy</a>
              <a href="https://pirhotech.com/contact" class="footer-link">Contact Us</a>
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Email template for admin (notification)
    const adminEmailTemplate = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>New Contact Form Submission</title>
        <style>
          body, html {
            margin: 0;
            padding: 0;
            font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
            line-height: 1.6;
            color: #333333;
            background-color: #f8f8f8;
          }
          
          .email-container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #ffffff;
            border-radius: 8px;
            overflow: hidden;
            box-shadow: 0 4px 10px rgba(0,0,0,0.08);
          }
          
          .email-header {
            background-color: #18181b;
            color: #ffffff;
            padding: 25px 30px;
            text-align: center;
          }
          
          .email-header h1 {
            margin: 0;
            font-size: 24px;
            font-weight: 700;
          }
          
          .email-content {
            padding: 30px;
            background-color: #ffffff;
          }
          
          .user-info {
            background-color: #f9f9fb;
            border-radius: 6px;
            padding: 20px;
            margin-bottom: 25px;
          }
          
          .info-row {
            margin-bottom: 12px;
          }
          
          .info-label {
            font-weight: 600;
            color: #18181b;
            width: 80px;
            display: inline-block;
          }
          
          .info-value {
            color: #444;
          }
          
          .message-container {
            background-color: #f9f9fb;
            border-left: 4px solid #18181b;
            padding: 20px;
            border-radius: 4px;
          }
          
          .message-text {
            white-space: pre-wrap;
            color: #444;
            line-height: 1.7;
          }
          
          .priority-tag {
            display: inline-block;
            background-color: #f97316;
            color: white;
            font-weight: 600;
            font-size: 12px;
            padding: 4px 8px;
            border-radius: 4px;
            margin-left: 10px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
          }
          
          .action-button {
            display: inline-block;
            background-color: #18181b;
            color: #ffffff !important;
            text-decoration: none;
            padding: 12px 24px;
            border-radius: 4px;
            font-weight: 600;
            margin-top: 25px;
            text-align: center;
          }
          
          .timestamp {
            color: #666;
            font-size: 14px;
            margin-top: 25px;
            text-align: right;
            font-style: italic;
          }
        </style>
      </head>
      <body>
        <div class="email-container">
          <div class="email-header">
            <h1>New Contact Form Submission <span class="priority-tag">New</span></h1>
          </div>
          
          <div class="email-content">
            <div class="user-info">
              <div class="info-row">
                <span class="info-label">Name:</span>
                <span class="info-value">${name}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Email:</span>
                <span class="info-value">${email}</span>
              </div>
              <div class="info-row">
                <span class="info-label">Date:</span>
                <span class="info-value">${new Date().toLocaleString()}</span>
              </div>
            </div>
            
            <h2>Message Content:</h2>
            <div class="message-container">
              <p class="message-text">${message}</p>
            </div>
            
            <a href="mailto:${email}?subject=RE: Your inquiry to PiRhoTech" class="action-button">Reply to ${name}</a>
            
            <p class="timestamp">Submitted on ${new Date().toLocaleString()}</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Send confirmation email to the user
    await transporter.sendMail({
      from: `"PiRhoTech" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Thank you for contacting PiRhoTech',
      html: userEmailTemplate,
    });

    // Send notification to primary admin
    await transporter.sendMail({
      from: `"PiRhoTech Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'fahad288ali@gmail.com',
      subject: 'New Contact Form Submission',
      html: adminEmailTemplate,
    });

    // Send notification to secondary admin
    await transporter.sendMail({
      from: `"PiRhoTech Contact Form" <${process.env.EMAIL_USER}>`,
      to: 'farhansadik@mail.com',
      subject: 'New Contact Form Submission',
      html: adminEmailTemplate,
    });

    return res.status(200).json({ success: true, message: 'Email sent successfully' });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ success: false, message: 'Failed to send email' });
  }
} 
# Email Setup for Contact Form

This document explains how to set up the email functionality for the contact form on the website.

## Prerequisites

1. A working SMTP server or email service provider (like Gmail, SendGrid, Mailgun, etc.)
2. Node.js and npm/pnpm installed

## Installation

The nodemailer package is already installed in the project. If for some reason it's not, you can install it with:

```bash
pnpm install nodemailer
```

## Configuration

1. Create a `.env.local` file in the root directory of your project with the following contents:

```
# Email Configuration
EMAIL_HOST=smtp.example.com
EMAIL_PORT=587
EMAIL_SECURE=false
EMAIL_USER=your-email@example.com
EMAIL_PASSWORD=your-email-password
```

2. Replace the values with your actual SMTP server details:
   - `EMAIL_HOST`: Your SMTP server hostname
   - `EMAIL_PORT`: The port your SMTP server uses (common ports are 25, 465, 587, 2525)
   - `EMAIL_SECURE`: Set to 'true' if you're using port 465 with SSL, otherwise 'false'
   - `EMAIL_USER`: Your email username/address
   - `EMAIL_PASSWORD`: Your email password or app password

## Using Gmail

If you're using Gmail as your SMTP provider:

1. Set `EMAIL_HOST` to `smtp.gmail.com`
2. Set `EMAIL_PORT` to `587`
3. Set `EMAIL_SECURE` to `false`
4. Set `EMAIL_USER` to your Gmail address
5. For `EMAIL_PASSWORD`, you'll need to use an app password:
   - Go to your Google Account > Security
   - Enable 2-Step Verification if not already enabled
   - Go to App passwords, generate a new app password for "Mail" and "Other (Custom name)"
   - Use this generated password in your `.env.local` file

## Using SendGrid

If you're using SendGrid:

1. Set `EMAIL_HOST` to `smtp.sendgrid.net`
2. Set `EMAIL_PORT` to `587`
3. Set `EMAIL_SECURE` to `false`
4. Set `EMAIL_USER` to `apikey`
5. Set `EMAIL_PASSWORD` to your SendGrid API key

## Testing

To test if your email configuration works:

1. Fill out the contact form on the website
2. Check the email addresses:
   - The user's email (the one entered in the form)
   - fahad288ali@gmail.com
   - farhansadik@mail.com

All three should receive emails when a form is submitted.

## Troubleshooting

If emails are not being sent:

1. Check your server logs for any errors
2. Verify your SMTP credentials are correct
3. Make sure your email service provider allows SMTP access
4. If using Gmail, ensure you're using an app password, not your regular password
5. Check if your email service has sending limits or restrictions 
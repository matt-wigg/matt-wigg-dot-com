import { SendEmailCommand } from '@aws-sdk/client-ses';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorRes } from '@/types/ErrorTypes';
import sesClient from '@/lib/awsClient';
import xss from 'xss';

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        {
          error: 'Missing required form fields',
        } as ErrorRes,
        { status: 400 }
      );
    }

    // Sanitize input
    const safeName = xss(name);
    const safeEmail = xss(email);
    const safeMessage = xss(message);

    const htmlBody = `<div style="background-color: #111827; color: #f3f4f6; padding: 20px;">
        <h1>You have a new message from your website's contact form.</h1>
        <p>Here are the details:</p>
        <ul>
            <li>Name: ${safeName}</li>
            <li>Email: ${safeEmail}</li>
            <li>Message: ${safeMessage}</li>
        </ul>
    </div>`;

    const htmlConfirmationBody = `<div style="background-color: #111827; color: #f3f4f6; padding: 20px;">
        <h1>Hello ${safeName},</h1>
        <p>Thanks for reaching out to me! I'll get back to you as soon as I can.</p>
        <p>Here are the details I received:</p>
        <ul>
            <li>Name: ${safeName}</li>
            <li>Email: ${safeEmail}</li>
            <li>Message: ${safeMessage}</li>
        </ul>
        <p>All the best,<br />Matt.</p>
    </div>`;

    const emailParams = {
      Destination: {
        ToAddresses: [process.env.TO_EMAIL || 'invalid-email'],
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `New Contact Form Submission from ${safeEmail}`,
        },
      },
      Source: `${safeName} <${process.env.FROM_EMAIL}>`,
    };

    // Email parameters for confirmation email
    const confirmationEmailParams = {
      Destination: {
        ToAddresses: [safeEmail], // send to the user's email
      },
      Message: {
        Body: {
          Html: {
            Charset: 'UTF-8',
            Data: htmlConfirmationBody,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `Confirmation of Your Contact Form Submission`,
        },
      },
      Source: `Matthew Wigglesworth <${process.env.FROM_EMAIL}>`,
    };

    let result;
    try {
      result = await sesClient.send(new SendEmailCommand(emailParams));

      // Send the confirmation email
      await sesClient.send(new SendEmailCommand(confirmationEmailParams));
    } catch (error: any) {
      console.error('Failed to send email:', error);
      return NextResponse.json(
        {
          error: 'Your message failed to send, please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Return success response
    return NextResponse.json({
      message: 'Your message was sent successfully!',
      result,
    });
  } catch (error: any) {
    // Catch-all error handler
    console.error('Unexpected server error:', error);
    return NextResponse.json(
      {
        error: 'An internal error occurred. Please try again later.',
      } as ErrorRes,
      { status: 500 }
    );
  }
}

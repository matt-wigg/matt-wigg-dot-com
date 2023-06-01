import { SendEmailCommand } from '@aws-sdk/client-ses';
import { NextRequest, NextResponse } from 'next/server';
import { ErrorRes } from '@/types/ErrorTypes';
import sesClient from '@/lib/awsClient';

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

    const emailParams = {
      Destination: {
        ToAddresses: [process.env.TO_EMAIL || 'invalid-email'],
      },
      Message: {
        Body: {
          Text: {
            Charset: 'UTF-8',
            Data: `You have a new message from your website's contact form.
            Here are the details:
            Name: ${name}
            Email: ${email}
            Message: ${message}`,
          },
        },
        Subject: {
          Charset: 'UTF-8',
          Data: `MATTWIGG.COM: New Contact Form Submission from ${email}`,
        },
      },
      Source: `${name} <${process.env.FROM_EMAIL}>`,
    };

    let result;
    try {
      result = await sesClient.send(new SendEmailCommand(emailParams));
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

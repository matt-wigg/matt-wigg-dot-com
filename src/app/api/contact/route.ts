// Importing AWS
import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  // Destructure request body and set default phone value
  const { name, email, message } = await req.json(); // Call req.json() only once

  // Validate required fields
  if (!name || !email || !message) {
    return NextResponse.json(
      { message: 'Missing required form fields' },
      { status: 400 }
    );
  }

  // Check if the environment variables are set
  if (
    !process.env.AWS_REGION ||
    !process.env.AWS_ACCESS_KEY_ID ||
    !process.env.AWS_SECRET_ACCESS_KEY
  ) {
    throw new Error('AWS configuration environment variables are not set');
  }

  // Configure AWS and create SES client
  const sesClient = new SESClient({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // Define email parameters
  const emailParams = {
    Destination: {
      // CcAddresses: [process.env.CC_EMAIL || 'invalid-email'],
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

  // Send email
  try {
    const result = await sesClient.send(new SendEmailCommand(emailParams));

    // Return success response
    return NextResponse.json({
      message: 'Your message was sent successfully!',
      result,
    });
  } catch (error) {
    // Return error response
    console.log(error);
    return NextResponse.json(
      {
        message: 'Your message failed to send, please try again later.',
        error,
      },
      { status: 400 }
    );
  }
}

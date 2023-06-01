import { NextRequest, NextResponse } from 'next/server';
import { ErrorRes } from '@/types/ErrorTypes';

// Constants
const MAX_FILE_SIZE = 500000; // 500KB
const OPEN_AI_API = 'https://api.openai.com/v1/audio/transcriptions';
const MODEL_NAME = 'whisper-1';

export async function POST(req: NextRequest) {
  try {
    const form = await req.formData();
    const file = form.get('file') as File;

    // Validate file existence and type
    if (!file) {
      return NextResponse.json(
        {
          error:
            'No file provided or invalid file. Please upload a valid file.',
        } as ErrorRes,
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        {
          error:
            'Provided file is too large. Please upload a file smaller than 500KB.',
        } as ErrorRes,
        { status: 400 }
      );
    }

    // Validate existence and non-emptiness of the OpenAI key and organization
    if (!process.env.OPEN_AI_KEY || !process.env.OPEN_AI_ORG) {
      console.error('Server error: Missing OpenAI key or organization');
      return NextResponse.json(
        {
          error: 'An internal error occurred. Please try again later.',
        } as ErrorRes,
        { status: 500 }
      );
    }

    // Append file and model details to form data
    const formData = new FormData();
    formData.append('file', file);
    formData.append('model', MODEL_NAME);

    let response;
    try {
      // Make request to OpenAI API for audio transcription
      response = await fetch(OPEN_AI_API, {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          organization: process.env.OPEN_AI_ORG,
        },
      });
    } catch (err) {
      console.error('Failed to fetch from OpenAI API:', err);
      return NextResponse.json(
        {
          error:
            'Failed to communicate with the transcription service. Please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Validate response status
    if (!response.ok) {
      console.error('OpenAI API returned an error:', await response.text());
      return NextResponse.json(
        {
          error:
            'Transcription service returned an error. Please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Check for JSON response type
    const contentType = response.headers.get('content-type');
    if (!contentType || !contentType.includes('application/json')) {
      console.error('Invalid response from OpenAI API:', await response.text());
      return NextResponse.json(
        {
          error:
            'Transcription service returned an invalid response. Please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Parse and return the response
    const result = await response.json();
    return NextResponse.json(result);
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

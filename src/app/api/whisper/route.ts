import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  if (!req.body || !req.body.file) {
    return NextResponse.json(
      { error: 'No audio file provided.' },
      { status: 400 }
    );
  }

  const audioFile = req.body.file;

  if (!audioFile) {
    return NextResponse.json(
      { error: 'No audio file provided.' },
      { status: 400 }
    );
  }

  const formData = new FormData();
  formData.append('file', audioFile, 'audio.webm');
  formData.append('model', 'whisper-1');

  try {
    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
          // FormData generates a boundary string and sets it in 'content-type' header.
          // Do not manually set 'content-type' header to 'multipart/form-data'.
        },
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    return NextResponse.json({ message: result.text });
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

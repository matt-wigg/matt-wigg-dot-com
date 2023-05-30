import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest, res: NextResponse) {
  try {
    const form = await req.formData();
    const file = form.get('file');

    if (!file) {
      return NextResponse.json({ error: 'Missing file' }, { status: 400 });
    }

    // Cast the FormDataEntryValue to File type to access the size property
    const fileObj = file as File;

    if (fileObj.size > 500000) {
      return NextResponse.json(
        { error: 'File size exceeds the limit' },
        { status: 400 }
      );
    }

    const formData = new FormData();
    formData.append('file', fileObj);
    formData.append('model', 'whisper-1');

    const response = await fetch(
      'https://api.openai.com/v1/audio/transcriptions',
      {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${process.env.OPEN_AI_KEY}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error('API request failed');
    }

    const result = await response.json();
    return NextResponse.json(result);
  } catch (error: any) {
    console.log(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

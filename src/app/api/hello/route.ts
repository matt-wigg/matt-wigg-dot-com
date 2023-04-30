import { Configuration, OpenAIApi } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const json = await req.json();
  const message = json.message;
  console.log(message);

  // Sleep function to add delay
  const sleep = (ms: number): Promise<void> => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  // Add a delay before making an API request
  await sleep(1000); // 1000 ms or 1 second; adjust this value based on your rate limits

  const completion = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'user',
        content: message,
      },
    ],
  });

  const responseText = completion.data.choices[0].message?.content;

  if (responseText) {
    return NextResponse.json({ message: responseText });
  } else {
    const error = new Error();
    error.message = 'No response from the model.';
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

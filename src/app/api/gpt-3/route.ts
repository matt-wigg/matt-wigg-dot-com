import { Configuration, OpenAIApi } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY,
  });

  const openai = new OpenAIApi(configuration);

  const requestBody = await req.json(); // Call req.json() only once
  const { messages } = requestBody;

  console.log(messages);
  await sleep(1000);

  // Get the last user message
  const lastUserMessage = messages[messages.length - 1];

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'Make all responses no greater that 100 characters.',
        },
        {
          role: 'user',
          content: lastUserMessage.content,
        },
      ],
      max_tokens: 2000,
    });

    const responseText = completion.data.choices[0]?.message?.content;

    if (responseText) {
      return NextResponse.json({ message: responseText });
    } else {
      throw new Error('No response from the model.');
    }
  } catch (error) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 500 }
    );
  }
}

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

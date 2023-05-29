import { Configuration, OpenAIApi } from 'openai';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  const configuration = new Configuration({
    organization: process.env.OPEN_AI_ORG,
    apiKey: process.env.OPEN_AI_KEY,
  });
  const openai = new OpenAIApi(configuration);
  const requestBody = await req.json();
  const { messages } = requestBody;
  messages.unshift({
    role: 'system',
    content: 'Limit responses to 100 characters.',
  });

  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4',
      messages: messages,
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

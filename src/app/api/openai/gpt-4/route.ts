import { NextRequest, NextResponse } from 'next/server';
import openai from '@/lib/openaiClient';
import { ErrorRes } from '@/types/ErrorTypes';

// Constants
const MAX_TOKENS = 2000;
const MODEL_NAME = 'gpt-4';

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { messages } = requestBody;
    // Add the system message only if it's not present.
    const systemMessage = {
      role: 'system',
      content: 'Limit responses to 100 characters.',
    };

    if (
      !messages[0] ||
      messages[0].role !== 'system' ||
      messages[0].content !== systemMessage.content
    ) {
      messages.unshift(systemMessage);
    }

    let completion;
    try {
      // Make request to OpenAI API for chat completion
      completion = await openai.createChatCompletion({
        model: MODEL_NAME,
        messages: messages,
        max_tokens: MAX_TOKENS,
      });
    } catch (error: any) {
      console.error('Failed to fetch from OpenAI API:', error);
      return NextResponse.json(
        {
          error:
            'Failed to communicate with the chat service. Please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    const responseText = completion.data.choices[0]?.message?.content;

    if (!responseText) {
      console.error(
        'OpenAI API returned an error: No response from the model.'
      );
      return NextResponse.json(
        {
          error: 'Chat service returned an error. Please try again later.',
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Return the response
    return NextResponse.json({ message: responseText });
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

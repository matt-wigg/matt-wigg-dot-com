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

  await sleep(1000); // 1 second delay; rate limits

  console.log(messages);
  try {
    const completion = await openai.createChatCompletion({
      model: 'gpt-4', //https://platform.openai.com/docs/models/gpt-4 or 'gpt-3.5-turbo'
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

// export async function POST(req: NextRequest) {
//   const configuration = new Configuration({
//     organization: process.env.OPEN_AI_ORG,
//     apiKey: process.env.OPEN_AI_KEY,
//   });

//   const openai = new OpenAIApi(configuration);

//   const requestBody = await req.json(); // Call req.json() only once
//   const { message } = requestBody;
//   const { messages } = requestBody;

//   console.log(message);
//   console.log(messages);
//   await sleep(1000); // 1 second delay; rate limits

//   try {
//     const completion = await openai.createChatCompletion({
//       model: 'gpt-4', //https://platform.openai.com/docs/models/gpt-4 or 'gpt-3.5-turbo'
//       messages: [
//         {
//           role: 'user',
//           content: messages ? messages : message,
//         },
//       ],
//       // max_tokens: 150,
//     });

//     const responseText = completion.data.choices[0]?.message?.content;

//     if (responseText) {
//       return NextResponse.json({ message: responseText });
//     } else {
//       throw new Error('No response from the model.');
//     }
//   } catch (error) {
//     return NextResponse.json(
//       { error: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

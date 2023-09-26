import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { NextRequest, NextResponse } from "next/server";
import { ErrorRes } from "@/types/ErrorTypes";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Optional, but recommended: run on the edge runtime
export const runtime = "edge";

export async function POST(req: Request) {
  try {
    // Extract the `messages` from the body of the request
    const { messages } = await req.json();
    const lastUserMessage = messages[messages.length - 1];

    // Extend your existing messages array if needed
    const extendedMessages = [
      {
        role: "system",
        content: "Limit responses to 200 characters.",
      },
      {
        role: "user",
        content: lastUserMessage.content,
      },
      ...messages,
    ];

    let response;
    try {
      // Request the OpenAI API for the response based on the prompt
      response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        stream: true,
        messages: extendedMessages,
      });
    } catch (error: any) {
      console.error("Failed to fetch from OpenAI API:", error);
      return NextResponse.json(
        {
          error:
            "Failed to communicate with the chat service. Please try again later.",
        } as ErrorRes,
        { status: 502 } // Bad Gateway
      );
    }

    // Convert the response into a friendly text-stream
    const stream = OpenAIStream(response);

    // Return the streaming response
    return new StreamingTextResponse(stream);
  } catch (error: any) {
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      {
        error: "An internal error occurred. Please try again later.",
      } as ErrorRes,
      { status: 500 } // Internal Server Error
    );
  }
}

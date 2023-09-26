import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { ErrorRes } from "@/types/ErrorTypes";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
});

// Constants
const MODEL_NAME = "gpt-4";

export async function POST(req: NextRequest) {
  try {
    const requestBody = await req.json();
    const { messages } = requestBody;

    // Add the system message only if it's not present.
    const systemMessage = {
      role: "system",
      content: "Limit responses to 200 characters.",
    };

    if (
      !messages[0] ||
      messages[0].role !== "system" ||
      messages[0].content !== systemMessage.content
    ) {
      messages.unshift(systemMessage);
    }

    let response;
    try {
      // Make request to OpenAI API for chat completion with streaming
      response = await openai.chat.completions.create({
        model: MODEL_NAME,
        stream: true,
        messages: messages,
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
    // Catch-all error handler
    console.error("Unexpected server error:", error);
    return NextResponse.json(
      {
        error: "An internal error occurred. Please try again later.",
      } as ErrorRes,
      { status: 500 } // Internal Server Error
    );
  }
}

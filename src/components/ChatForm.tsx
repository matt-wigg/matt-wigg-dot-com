"use client";
import React, { useState, useEffect, useRef } from "react";
import { PaperAirplaneIcon, ArrowPathIcon } from "@heroicons/react/24/outline";
import ContentCard from "@/components/ContentCard/ContentCard";
import Button from "@/components/Button";
import { useChat } from "ai/react";

const ChatForm = ({ show }: { show: boolean }) => {
  const [selectedModel, setSelectedModel] = useState("gpt-3");
  const { messages, input, handleInputChange, handleSubmit, isLoading } =
    useChat({
      api: `/api/openai/${selectedModel}`,
    });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messages[0]?.content &&
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const formEvent = new Event("submit", {
        bubbles: true,
        cancelable: true,
      });
      e.currentTarget.form?.dispatchEvent(formEvent);
    }
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <ContentCard
      show={show}
      title="Matt-GPT v0.9-alpha"
      content={
        <>
          {/* System message */}
          {/* <p className="pb-4">
            <span className="pb-4">
              All requests currently carry a system message prefix to deter
              timeouts in Vercel&apos;s hobby-tier edge functions.
            </span>
          </p> */}

          {/* Model selection */}
          <div className="mb-4">
            <label
              htmlFor="model-selection"
              className="block mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100"
            >
              Select a chat model:
            </label>
            <select
              id="model-selection"
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className={`w-full dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                !isLoading
                  ? "dark:hover:border-yellow-400 hover:border-yellow-400 cursor-pointer"
                  : "cursor-not-allowed"
              }`}
            >
              <option value="gpt-3">gpt-3.5-turbo (single message)</option>
              <option value="gpt-4">gpt-4 (conversational)</option>
            </select>
          </div>

          {/* Chat log */}
          <span className="block mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100">
            Chat log:
          </span>
          <div className="overflow-y-auto h-52 mb-4 border border-gray-700 rounded-lg p-4 bg-white dark:bg-zinc-950 dark:text-gray-300">
            <p className="pb-1">
              <span className="dark:text-gray-600">{`System: limit responses to 200 characters.`}</span>
            </p>
            {messages.map((message, index) => (
              <p key={index} className="pb-1">
                <span
                  className={`${
                    message.role === "user"
                      ? "dark:text-gray-400"
                      : "font-bold dark:text-yellow-400"
                  }`}
                >
                  {`${message.role}: ${
                    typeof message.content === "string" &&
                    message.content.startsWith("{")
                      ? JSON.parse(message.content).message
                      : message.content
                  }`}
                </span>
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit}>
            <div className="flex">
              <textarea
                name="message"
                id="message"
                rows={3}
                placeholder={isLoading ? "Processing..." : "Send a message..."}
                required
                value={input}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
                className={`flex-grow dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-4 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                  !isLoading
                    ? "dark:hover:border-yellow-400 hover:border-yellow-400"
                    : "opacity-50 cursor-not-allowed"
                }`}
                disabled={isLoading}
              />
              <Button
                type="submit"
                className="ml-4 px-6 py-2 border flex items-center justify-center"
                disabled={!input || isLoading}
              >
                {isLoading ? (
                  <ArrowPathIcon className="h-5 w-5 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin" />
                ) : (
                  <PaperAirplaneIcon className="h-5 w-5 text-yellow-400 dark:text-yellow-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400" />
                )}
              </Button>
            </div>
          </form>
        </>
      }
    />
  );
};

export default ChatForm;

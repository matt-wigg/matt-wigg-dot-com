'use client';
import React, { useState, useEffect, useRef } from 'react';
import { PaperAirplaneIcon, ArrowPathIcon } from '@heroicons/react/24/outline';
import ContentCard from '@/components/ContentCard/ContentCard';
import Button from '@/components/Button';

const ChatForm = ({ show }: { show: boolean }) => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messages[0]?.content &&
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();

    if (trimmedInput !== '') {
      setInput('');
      setLoading(true);
      const userMessage = { role: 'user', content: trimmedInput };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await fetch(`/api/openai/${selectedModel}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ messages: [...messages, userMessage] }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        const assistantMessage = { role: 'assistant', content: data.message };
        setMessages((prevMessages) => [...prevMessages, assistantMessage]);
      } catch (error: any) {
        console.error('Error fetching data:', error);

        if (error.message === 'Some Specific Error' || error.status === 500) {
          const errorMessage = {
            role: 'error',
            content: 'An error occurred. Please try again.',
          };
          setMessages((prevMessages) => [...prevMessages, errorMessage]);
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <ContentCard
      show={show}
      title='Matt-GPT v0.9-alpha'
      content={
        <>
          <p className='pb-4'>
            <span className='pb-4'>
              All requests currently carry a system message prefix to deter
              timeouts in Vercel&apos;s hobby-tier edge functions.
            </span>
          </p>
          <div className='mb-4'>
            <label
              htmlFor='model-selection'
              className='block mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'
            >
              Select a chat model:
            </label>
            <select
              id='model-selection'
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className='w-full dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none'
            >
              <option value='gpt-3'>gpt-3.5-turbo (single message)</option>
              <option value='gpt-4'>gpt-4 (conversational)</option>
            </select>
          </div>
          <span className='block mb-4 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
            Chat log:
          </span>
          <div className='overflow-y-auto h-52 mb-4 border border-gray-700 rounded-lg p-4 bg-white dark:bg-zinc-950 dark:text-gray-300'>
            <p className='pb-1'>
              <span className='dark:text-gray-600'>
                {`system: Limit responses to 100 characters.`}
              </span>
            </p>
            {messages.map((message, index) => (
              <p key={index} className={`animate-fadeInOpacity pb-1`}>
                <span
                  className={`${
                    message.role === 'user'
                      ? 'dark:text-gray-400'
                      : 'font-bold dark:text-yellow-400'
                  }`}
                >
                  {`${message.role}: ${message.content}`}
                </span>
              </p>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <form onSubmit={handleSubmit}>
            <div className='flex'>
              <textarea
                name='message'
                id='message'
                rows={3}
                placeholder={loading ? 'Processing...' : 'Send a message...'}
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                className={`flex-grow dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-4 focus:ring-1 focus:ring-yellow-400 focus:outline-none hover:border-yellow-400 dark:hover:border-yellow-400 ${
                  loading && 'opacity-50'
                }`}
                disabled={loading}
              />
              <Button
                type='submit'
                className='ml-4 px-6 py-2 border flex items-center justify-center'
                disabled={!input || loading}
              >
                {loading ? (
                  <ArrowPathIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin' />
                ) : (
                  <PaperAirplaneIcon className='h-6 w-6 text-yellow-400 dark:text-yellow-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400' />
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

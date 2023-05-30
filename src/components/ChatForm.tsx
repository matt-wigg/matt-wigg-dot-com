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
        const response = await fetch(`/api/${selectedModel}`, {
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
              This chatbot may time out if it is too busy or the max_token
              length is exceeded. All requests are prefixed with the following
              system message in an attempt to prevent timeouts while using
              Vercel&apos;s hobbyist-tier edge functions:
            </span>
          </p>
          <pre className='bg-gray-500 dark:bg-zinc-900 text-slate-200 rounded-md overflow-auto p-4 text-xs'>
            <code>
              {`{ role: 'system', content: 'Limit responses to 100 characters.' }`}
            </code>
          </pre>
          <div className='my-4'>
            <label
              htmlFor='model-selection'
              className='block mb-2 text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'
            >
              Select Model
            </label>
            <select
              id='model-selection'
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
              className='w-full dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none'
            >
              <option value='gpt-3'>GPT-3</option>
              <option value='gpt-4'>GPT-4</option>
            </select>
          </div>
          <div className='overflow-y-auto h-52 mb-4 border border-gray-700 rounded-lg p-4 bg-white dark:bg-zinc-950 dark:text-gray-300'>
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
                placeholder={
                  loading ? 'Processing... Hang tight!' : 'Send a message...'
                }
                required
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    handleSubmit(e);
                  }
                }}
                className={`flex-grow dark:bg-transparent dark:border-gray-700 border-gray-700 border shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                  loading && 'opacity-50'
                }`}
                disabled={loading}
              />
              <Button
                type='submit'
                className='ml-4 bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-6 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                disabled={!input || loading}
              >
                {loading ? (
                  <ArrowPathIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 animate-spin' />
                ) : (
                  <PaperAirplaneIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400' />
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

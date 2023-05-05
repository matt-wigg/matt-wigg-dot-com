'use client';
import React, { useState } from 'react';
import {
  PaperAirplaneIcon,
  ChevronDownIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';

import Button from './Button';
const ChatForm = ({ show }: { show: boolean }) => {
  const [contentVisible, setContentVisible] = useState(show);
  const [messages, setMessages] = useState<{ role: string; content: string }[]>(
    []
  );
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedModel, setSelectedModel] = useState('gpt-3'); // Add a state to store the selected model

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

        // Handle specific error messages or status codes here
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

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  // const LoadingDots = () => (
  //   <div className='flex justify-center items-center space-x-1'>
  //     <div className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce'></div>
  //     <div className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-75'></div>
  //     <div className='w-2 h-2 bg-yellow-400 rounded-full animate-bounce delay-150'></div>
  //   </div>
  // );

  return (
    <section className='container px-4 flex flex-col text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header
          onClick={toggleContentVisibility}
          className='group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900'
        >
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
              Matt-GPT v0.9-alpha
            </h3>
          </div>
          <Button onClick={toggleContentVisibility}>
            <ChevronDownIcon
              className={`h-4 w-4 transform transition duration-300 ${
                contentVisible ? ' text-yellow-400' : 'rotate-180'
              }`}
            />
          </Button>
        </header>

        {contentVisible && (
          <div className='border-t border-gray-700 dark:border-gray-700 px-4 py-5 sm:p-6'>
            <p className='pb-4'>
              {/* This chat uses the model GPT-4 by OpenAI. */}
              <span className='font-bold text-rose-600 dark:text-yellow-400'>
                The model may time out if it is too busy or the response is too
                long.
              </span>
            </p>
            {/* Add the dropdown for model selection */}
            <div className='mb-4'>
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
                className='w-full dark:bg-transparent dark:border-gray-700 border-gray-700 border-2 shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none' // Add paddingRight style to the select element
              >
                <option value='gpt-3'>GPT-3</option>
                <option value='gpt-4'>GPT-4</option>
              </select>
            </div>
            <div className='overflow-y-auto h-96 mb-4 border border-gray-700 rounded-lg p-4 bg-white dark:bg-zinc-950 dark:text-gray-300'>
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
                  className={`flex-grow dark:bg-transparent dark:border-gray-700 border-gray-700 border-2 shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    loading && 'opacity-50'
                  }`}
                  disabled={loading}
                />
                <Button
                  type='submit'
                  className='ml-4 bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
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
          </div>
        )}
      </article>
    </section>
  );
};

export default ChatForm;

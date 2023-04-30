'use client';
import React, { useState } from 'react';
import {
  PaperAirplaneIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Button from './Button';
//comment to remove
const ChatForm = ({ show }: { show: boolean }) => {
  const [contentVisible, setContentVisible] = useState(show);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (input.trim() !== '') {
      setLoading(true);

      setMessages((prevMessages) => [...prevMessages, `User: ${input.trim()}`]);

      try {
        const response = await fetch('/api/hello', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: input.trim(), messages: messages }),
        });

        if (!response.ok) {
          throw new Error(`HTTP error ${response.status}`);
        }

        const data = await response.json();
        setMessages((prevMessages) => [...prevMessages, `AI: ${data.message}`]);

        setInput('');
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <section className='container px-4 flex flex-col text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header
          onClick={toggleContentVisibility}
          className='group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900'
        >
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
              Matt-GPT v0.9-apha
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
            <p className='pb-1'>
              This chat model does not currently support multi-line messages.
            </p>
            <p className='pb-4'>
              The model will only consider the last line of your message.
            </p>
            <div className='overflow-y-auto h-64 mb-4 border border-gray-300 rounded-lg p-4 bg-white dark:bg-zinc-950 dark:text-gray-300'>
              {messages.map((message, index) => (
                <p key={index}>{message}</p>
              ))}
            </div>
            <form onSubmit={handleSubmit}>
              <div className='flex'>
                <input
                  type='text'
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder='Type your message...'
                  className={`flex-grow dark:bg-transparent dark:border-gray-700 border-gray-700 border-2 shadow-sm sm:text-sm rounded-md p-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none`}
                />
                <Button
                  type='submit'
                  className='ml-4 bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  disabled={!input || loading}
                >
                  {loading ? (
                    <svg
                      className='animate-spin h-5 w-5 text-gray-600 dark:text-gray-400'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='none'
                      viewBox='0 0 24 24'
                    >
                      <circle
                        className='opacity-25'
                        cx='12'
                        cy='12'
                        r='10'
                        stroke='currentColor'
                        strokeWidth='4'
                      ></circle>
                      <path
                        className='opacity-75'
                        fill='currentColor'
                        d='M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z'
                      ></path>
                    </svg>
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

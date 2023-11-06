'use client';

import React, { useState } from 'react';
import {
  EnvelopeIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon,
} from '@heroicons/react/24/outline';
import Button from '@/components/Button';
import ContentCard from '@/components/ContentCard/ContentCard';

const ContactForm = ({ show }: { show: boolean }) => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      if (res.status === 200) {
        setSuccess(true);
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const reloadForm = () => {
    setSuccess(false);
    setError(false);
    setName('');
    setEmail('');
    setMessage('');
  };

  const renderIcon = () => {
    if (loading)
      return (
        <ArrowPathIcon className='h-5 w-5 text-gray-600 mr-2 animate-spin opacity-50' />
      );
    if (success)
      return (
        <ArrowUturnLeftIcon className='h-5 w-5 text-gray-600 dark:group-hover:text-yellow-400 mr-2' />
      );
    if (error)
      return (
        <ArrowUturnLeftIcon className='h-5 w-5 text-gray-600 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 mr-2' />
      );
    return (
      <EnvelopeIcon className='h-5 w-5 text-gray-600 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 mr-2' />
    );
  };

  return (
    <ContentCard
      show={show}
      title='Contact'
      content={
        <div>
          {!success && !error && (
            <p className='py-1 max-w-2xl font-light text-gray-500 dark:text-gray-300 mb-4'>
              This form will send me an email with your message. I will get back
              to you as soon as possible.
            </p>
          )}
          {success ? (
            // ...
            // success content
            <div className='text-center'>
              <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
                Success!
              </h3>
              <p className='mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-300 pt-1'>
                Thank you, your message was sent successfully. I will get back
                to you as soon as possible.
              </p>
              <div className='flex items-center justify-center pt-4'>
                <Button
                  type='submit'
                  className='group justify-center'
                  disabled={loading}
                  onClick={reloadForm}
                >
                  {renderIcon()}
                  <span
                    className={`text-sm text-gray-600 ${
                      !loading && 'group-hover:text-yellow-400'
                    } font-medium`}
                  >
                    {loading
                      ? 'Sending...'
                      : success
                      ? 'Return'
                      : error
                      ? 'Retry'
                      : 'Send'}
                  </span>
                </Button>
              </div>
            </div>
          ) : error ? (
            // ...
            // error content
            <div className='text-center'>
              <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
                Oops!
              </h3>
              <p className='mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-300 pt-1'>
                Something went wrong. Please try again later.
              </p>
              <div className='flex items-center justify-center pt-4'>
                <Button
                  type='submit'
                  className='group justify-center'
                  disabled={loading || success}
                  onClick={reloadForm}
                >
                  {renderIcon()}
                  <span
                    className={`text-sm text-gray-600 ${
                      !loading && 'group-hover:text-yellow-400'
                    } font-medium`}
                  >
                    {loading
                      ? 'Sending...'
                      : success
                      ? 'Retrun'
                      : error
                      ? 'Retry'
                      : 'Send'}
                  </span>
                </Button>
              </div>
            </div>
          ) : (
            // ...
            // form content
            <form onSubmit={handleSubmit}>
              <div className='space-y-4'>
                {/* ... input fields and textarea */}
                <input
                  type='text'
                  name='name'
                  id='name'
                  placeholder='Name *'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`dark:bg-transparent dark:border-gray-700 border-gray-700 border block w-full shadow-sm sm:text-sm rounded-md px-4 py-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    !loading &&
                    'dark:hover:border-yellow-400 hover:border-yellow-400'
                  } ${loading && 'opacity-50 cursor-not-allowed'}`}
                  disabled={loading || success || error}
                />

                <input
                  type='email'
                  name='email'
                  id='email'
                  placeholder='Email *'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`dark:bg-transparent dark:border-gray-700 border-gray-700 border block w-full shadow-sm sm:text-sm rounded-md px-4 py-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    !loading &&
                    'dark:hover:border-yellow-400 hover:border-yellow-400'
                  } ${loading && 'opacity-50 cursor-not-allowed'}`}
                  disabled={loading || success || error}
                />

                <textarea
                  name='message'
                  id='message'
                  rows={5}
                  placeholder='Message *'
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className={`dark:bg-transparent dark:border-gray-700 border-gray-700 border block w-full shadow-sm sm:text-sm rounded-md px-4 py-2 focus:ring-1 focus:ring-yellow-400 focus:outline-none ${
                    !loading &&
                    'dark:hover:border-yellow-400 hover:border-yellow-400'
                  } ${loading && 'opacity-50 cursor-not-allowed'}`}
                  disabled={loading || success || error}
                />

                <div className='flex items-center justify-end'>
                  <Button
                    type='submit'
                    className='group justify-center'
                    disabled={loading || success || error}
                  >
                    {renderIcon()}
                    <span
                      className={`text-sm text-gray-600 ${
                        !loading && 'group-hover:text-yellow-400'
                      } font-medium`}
                    >
                      {loading
                        ? 'Sending...'
                        : success
                        ? 'Sent!'
                        : error
                        ? 'Error!'
                        : 'Send'}
                    </span>
                  </Button>
                </div>
              </div>
            </form>
          )}
        </div>
      }
    />
  );
};

export default ContactForm;

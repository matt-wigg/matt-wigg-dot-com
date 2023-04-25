'use client';

import React, { useState } from 'react';
import {
  EnvelopeIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Button from './Button';

const ContactForm = () => {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const [contentVisible, setContentVisible] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setError(true);
      alert('This is a demo. No message was sent.');
    }, 5000);
  };

  const reloadForm = () => {
    setSuccess(false);
    setError(false);
  };

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  const renderIcon = () => {
    if (loading)
      return (
        <ArrowPathIcon className='h-6 w-6 text-gray-600 dark:group-hover:text-yellow-400 mr-2 animate-spin' />
      );
    if (success)
      return (
        <ArrowUturnLeftIcon className='h-6 w-6 text-gray-600 dark:group-hover:text-yellow-400 mr-2' />
      );
    if (error)
      return (
        <ArrowUturnLeftIcon className='h-6 w-6 text-gray-600 dark:group-hover:text-yellow-400 mr-2' />
      );
    return (
      <EnvelopeIcon className='h-6 w-6 text-gray-600 dark:group-hover:text-yellow-400 mr-2' />
    );
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
              Contact
            </h3>
          </div>
          <Button onClick={toggleContentVisibility}>
            <ChevronDownIcon
              className={`h-4 w-4 transform transition duration-300 ${
                contentVisible
                  ? 'text-gray-600 dark:text-yellow-400'
                  : 'rotate-180 dark:text-gray-400'
              }`}
            />
          </Button>
        </header>

        {contentVisible && (
          <div className='border-t border-gray-200 dark:border-gray-700 px-4 py-5 sm:p-6'>
            {!success && !error && (
              <p className='py-1 max-w-2xl font-light text-gray-500 dark:text-gray-400 mb-4'>
                Send me a message and I will get back to you as soon as
                possible. I do not store or share your information.
              </p>
            )}
            {success ? (
              // ...
              // success content
              <div className='text-center'>
                <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
                  Thank you!
                </h3>
                <p className='mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400 pt-1'>
                  Your message has been sent. I will get back to you as soon as
                  possible.
                </p>
                <div className='flex items-center justify-center pt-4'>
                  <Button
                    type='submit'
                    className='group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer'
                    disabled={loading}
                    onClick={reloadForm}
                  >
                    {renderIcon()}
                    <span className='text-sm text-gray-600 dark:group-hover:text-yellow-400 font-medium'>
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
                <p className='mt-2 max-w-2xl text-sm text-gray-500 dark:text-gray-400 pt-1'>
                  Something went wrong. Please try again later.
                </p>
                <div className='flex items-center justify-center pt-4'>
                  <Button
                    type='submit'
                    className='group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center cursor-pointer'
                    disabled={loading || success}
                    onClick={reloadForm}
                  >
                    {renderIcon()}
                    <span className='text-sm text-gray-600 dark:group-hover:text-yellow-400 font-medium'>
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
                    className={`dark:bg-transparent dark:border-gray-700 border-gray-200 border-2 block w-full shadow-sm sm:text-sm rounded-md p-2 ${
                      loading && 'opacity-50'
                    }`}
                    disabled={loading || success || error}
                  />
                  <input
                    type='email'
                    name='email'
                    id='email'
                    placeholder='Email *'
                    required
                    className={`dark:bg-transparent dark:border-gray-700 border-gray-200 border-2 block w-full shadow-sm sm:text-sm rounded-md p-2 ${
                      loading && 'opacity-50'
                    }`}
                    disabled={loading || success || error}
                  />
                  <textarea
                    name='message'
                    id='message'
                    rows={5}
                    placeholder='Message *'
                    required
                    className={`dark:bg-transparent dark:border-gray-700 border-gray-200 border-2 block w-full shadow-sm sm:text-sm rounded-md p-2 ${
                      loading && 'opacity-50'
                    }`}
                    disabled={loading || success || error}
                  />

                  <div className='flex items-center justify-end'>
                    <Button
                      type='submit'
                      className='group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center'
                      disabled={loading || success || error}
                    >
                      {renderIcon()}
                      <span className='text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-yellow-400'>
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
        )}
      </article>
    </section>
  );
};

export default ContactForm;

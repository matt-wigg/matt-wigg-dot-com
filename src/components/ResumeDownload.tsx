'use client';
import { useState } from 'react';
import {
  DocumentArrowDownIcon,
  ChevronDownIcon,
} from '@heroicons/react/24/outline';
import Button from './Button';

const ResumeDownload = () => {
  const [contentVisible, setContentVisible] = useState(true);

  const downloadFile = (format: string) => {
    const link = document.createElement('a');
    link.href = `link-to-${format}-resume`;
    link.download = `resume.${format}`;
    link.click();
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
              Resume
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
          <div className='border-t border-gray-700 dark:border-gray-700 px-4 py-3 sm:px-6'>
            <p className='py-1 max-w-2xl font-light text-gray-500 dark:text-gray-400 mb-4'>
              Download my resume in .PDF, .DOC, or .MD format.
            </p>
            <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
              {['pdf', 'doc', 'md'].map((format) => (
                <li
                  key={format}
                  className='col-span-1 flex items-center justify-center py-2 px-2'
                >
                  <Button
                    onClick={() => downloadFile(format)}
                    className='group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-center'
                  >
                    <DocumentArrowDownIcon className='h-6 w-6 text-gray-600 dark:text-gray-400 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 mr-2' />
                    <span className='text-sm text-gray-600 dark:text-gray-400 font-medium group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
                      {format.toUpperCase()}
                    </span>
                  </Button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </section>
  );
};

export default ResumeDownload;

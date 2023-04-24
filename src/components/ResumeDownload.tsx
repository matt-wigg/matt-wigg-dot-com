'use client';

import React from 'react';
import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const ResumeDownload = () => {
  const downloadFile = (format) => {
    const link = document.createElement('a');
    link.href = `link-to-${format}-resume`;
    link.download = `resume.${format}`;
    link.click();
  };

  return (
    <div>
      <div className='container px-4 flex flex-col'>
        <div className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
          <div className='px-4 py-4 sm:px-6'>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
              Resume
            </h3>
            <p className='mt-2 max-w-2xl text-sm text-gray-500 dark:text-grey-500 pt-1'>
              Download my resume in PDF, DOC, or MD below.
            </p>
          </div>
          <div className='border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6'>
            <ul className='grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
              <li className='col-span-1 flex items-center justify-center py-2 px-2'>
                <button
                  onClick={() => downloadFile('pdf')}
                  className='bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center'
                >
                  <DocumentArrowDownIcon className='h-6 w-6 text-gray-600 dark:text-yellow-400 mr-2' />
                  <span className='text-sm text-gray-600 dark:text-yellow-400 font-medium'>
                    PDF
                  </span>
                </button>
              </li>
              <li className='col-span-1 flex items-center justify-center py-2 px-2'>
                <button
                  onClick={() => downloadFile('doc')}
                  className='bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center'
                >
                  <DocumentArrowDownIcon className='h-6 w-6 text-gray-600 dark:text-yellow-400 mr-2' />
                  <span className='text-sm text-gray-600 dark:text-yellow-400 font-medium'>
                    DOC
                  </span>
                </button>
              </li>
              <li className='col-span-1 flex items-center justify-center py-2 px-2'>
                <button
                  onClick={() => downloadFile('md')}
                  className='bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center'
                >
                  <DocumentArrowDownIcon className='h-6 w-6 text-gray-600 dark:text-yellow-400 mr-2' />
                  <span className='text-sm text-gray-600 dark:text-yellow-400 font-medium'>
                    MD
                  </span>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeDownload;

'use client';

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';
import Button from './Button';
import ContentCard from './ContentCard/ContentCard';

const ResumeDownload = () => {
  const downloadFile = (format: string) => {
    const link = document.createElement('a');
    link.href = `link-to-${format}-resume`;
    link.download = `resume.${format}`;
    link.click();
  };

  return (
    <ContentCard
      show={false}
      title='Resume'
      content={
        <div>
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
      }
    />
  );
};

export default ResumeDownload;

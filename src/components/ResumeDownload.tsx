'use client';

import { DocumentArrowDownIcon } from '@heroicons/react/24/outline';

const ResumeDownload = () => {
  const downloadFile = (format: string) => {
    const link = document.createElement('a');
    link.href = `link-to-${format}-resume`;
    link.download = `resume.${format}`;
    link.click();
  };

  return (
    <section className='container px-4 flex flex-col text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800 '>
        <header className='p-4 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
            Resume
          </h3>
          <p className='py-1 mt-2 max-w-2xl font-light text-gray-500 dark:text-gray-400 pt-1'>
            Download my resume in .PDF, .DOC, or .MD format.
          </p>
        </header>
        <div className='border-t border-gray-200 dark:border-gray-700 px-4 py-3 sm:px-6'>
          <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3'>
            {['pdf', 'doc', 'md'].map((format) => (
              <li
                key={format}
                className='col-span-1 flex items-center justify-center py-2 px-2'
              >
                <button
                  onClick={() => downloadFile(format)}
                  className='bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md px-4 py-2 border border-gray-200 dark:border-gray-700 flex items-center justify-center'
                >
                  <DocumentArrowDownIcon className='h-6 w-6 text-gray-600 dark:text-yellow-400 mr-2' />
                  <span className='text-sm text-gray-600 dark:text-yellow-400 font-medium'>
                    {format.toUpperCase()}
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </section>
  );
};

export default ResumeDownload;

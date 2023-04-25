'use client';

import { useState, useEffect } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const HeaderNotification = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setVisible(false);
    }
  };

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <header
      className=' bg-yellow-400 dark:text-gray-900 px-4 py-2 flex items-center justify-between cursor-pointer border-b border-gray-800'
      onClick={handleClose}
    >
      <p className='font-semibold'>
        This website is under development. Some features may not be fully
        functional.
      </p>
      <span className='p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 dark:focus:ring-yellow-300'>
        <Button
          className={`dark:text-white rounded px-2 py-2 text-xs mr-3 transition duration-150 ease-in-out bg-gray-500 dark:bg-gray-700 hidden md:inline border border-gray-800`}
        >
          esc.
        </Button>
        <XCircleIcon className='h-8 w-8 md:hidden' />
      </span>
    </header>
  );
};

export default HeaderNotification;

'use client';

import { useState } from 'react';
import { XCircleIcon } from '@heroicons/react/24/outline';

const HeaderNotification = () => {
  const [visible, setVisible] = useState(true);

  const handleClose = () => {
    setVisible(false);
  };

  if (!visible) {
    return null;
  }

  return (
    <div
      className='bg-yellow-500 dark:bg-yellow-400 text-white dark:text-gray-900 px-4 py-2 flex items-center justify-between cursor-pointer'
      onClick={handleClose}
    >
      <p className='font-semibold'>
        This website is under development. Some features may not be fully
        functional.
      </p>
      <button
        type='button'
        className='p-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-400 dark:focus:ring-yellow-300'
      >
        <XCircleIcon className='h-5 w-5' />
      </button>
    </div>
  );
};

export default HeaderNotification;

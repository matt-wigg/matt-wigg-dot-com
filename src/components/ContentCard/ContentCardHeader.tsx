import React from 'react';
import Button from '@/components/Button';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import { ContentCardHeaderProps } from '@/types/ContentCardTypes';

const ContentCardHeader: React.FC<ContentCardHeaderProps> = ({
  toggleContentVisibility,
  contentVisible,
  title,
}) => {
  return (
    <header
      onClick={toggleContentVisibility}
      className={`group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900 ${
        contentVisible && 'bg-gray-100 dark:bg-zinc-900'
      }`}
    >
      <h3
        className={`text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400 ${
          contentVisible && 'text-yellow-400 dark:text-yellow-400'
        }`}
      >
        {title}
      </h3>
      <Button
        onClick={toggleContentVisibility}
        className={`
          ${'group-hover:text-yellow-400 group-hover:bg-gray-100 dark:group-hover:bg-zinc-900'}
        `}
      >
        <ChevronDownIcon
          className={`h-4 w-4 ${
            contentVisible ? 'text-yellow-400' : 'rotate-180'
          } transition-transform duration-400`}
        />
      </Button>
    </header>
  );
};

export default ContentCardHeader;

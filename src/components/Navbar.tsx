'use client';
import React, { useState, useEffect } from 'react';
import {
  HomeIcon,
  CommandLineIcon,
  PencilSquareIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (!event.shiftKey) return; // Add this line to check if Shift is being pressed

      switch (event.key.toLowerCase()) {
        case 'a':
          router.push('/');
          break;
        case 'p':
          router.push('/projects');
          break;
        case 'b':
          router.push('/blog');
          break;
        case 'c':
          router.push('/contact');
          break;
        default:
          // Do nothing if any other key is pressed
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  });

  return (
    <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0'>
      <div className='md:flex bg-white dark:bg-zinc-950 dark:text-gray-100 w-1/6 h-full flex-col justify-between hidden top-0 left-0 border-r border-gray-800 fixed'>
        <nav className='px-6 py-4 space-y-2'>
          <h1 className='dark:text-yellow-400 px-6 py-4 text-lg font-medium leading-6 '>
            matt-wigg-dot-com
          </h1>
          <Link href='/' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'>
              <HomeIcon className='h-6 w-6 mr-4 text-yellow-400' />
              <span
                className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out bg-gray-200 dark:bg-gray-700 
              `}
              >
                Shift + A
              </span>
              {/* About */}
            </button>
          </Link>
          <Link href='/projects' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'>
              <CommandLineIcon className='h-6 w-6 mr-4 text-yellow-400' />
              <span
                className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 'bg-gray-400 bg-gray-300 dark:bg-gray-800''
              `}
              >
                Shift + P
              </span>
              {/* Projects */}
            </button>
          </Link>
          <Link href='/blog' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'>
              <BookOpenIcon className='h-6 w-6 mr-4 text-yellow-400' />
              <span
                className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 bg-gray-400 
              `}
              >
                Shift + B
              </span>
              {/* Blog */}
            </button>
          </Link>
          <Link href='/contact' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'>
              <PencilSquareIcon className='h-6 w-6 mr-4 text-yellow-400' />
              <span
                className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 'bg-gray-400 bg-gray-300 dark:bg-gray-800''
              `}
              >
                Shift + C
              </span>
              {/* Contact */}
            </button>
          </Link>
        </nav>
      </div>
      <div className='w-full'>
        {/* Mobile Navbar */}
        <div className='md:hidden flex items-center justify-between bg-zinc-950 p-4'>
          <p className='text-yellow-400 font-mono'>matt-wigg-dot-com</p>
          <button className='text-white' onClick={toggleMenu}>
            <svg
              className='w-6 h-6'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth='2'
                d='M4 6h16M4 12h16M4 18h16'
              ></path>
            </svg>
          </button>
        </div>
        {isOpen && (
          <nav className='md:hidden bg-zinc-950 p-4 space-y-2 text-gray-100 absolute top-12 w-full z-10'>
            <Link href='/' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <HomeIcon className='h-6 w-6 mr-4 text-yellow-400' />
                About
              </button>
            </Link>
            <Link href='/projects' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <CommandLineIcon className='h-6 w-6 mr-4 text-yellow-400' />
                Projects
              </button>
            </Link>
            <Link href='/blog' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <BookOpenIcon className='h-6 w-6 mr-4 text-yellow-400' />
                Blog
              </button>
            </Link>
            <Link href='/contact' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 dark:hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <PencilSquareIcon className='h-6 w-6 mr-4 text-yellow-400' />
                Contact
              </button>
            </Link>
          </nav>
        )}
        {/* Content */}
      </div>
    </div>
  );
};

export default Navbar;

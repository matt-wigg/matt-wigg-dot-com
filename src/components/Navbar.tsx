'use client';
import React, { useState, useEffect } from 'react';
import {
  UserCircleIcon,
  CommandLineIcon,
  PencilSquareIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import Button from './Button';
import ToggleTheme from './ToggleTheme';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // useEffect(() => {
  //   const handleKeyDown = (event: KeyboardEvent) => {
  //     if (!event.shiftKey) return; // Add this line to check if Shift is being pressed

  //     switch (event.key.toLowerCase()) {
  //       case 'a':
  //         router.push('/');
  //         break;
  //       case 'p':
  //         router.push('/projects');
  //         break;
  //       case 'b':
  //         router.push('/blog');
  //         break;
  //       case 'c':
  //         router.push('/contact');
  //         break;
  //       default:
  //         // Do nothing if any other key is pressed
  //         break;
  //     }
  //   };

  //   document.addEventListener('keydown', handleKeyDown);
  //   return () => {
  //     document.removeEventListener('keydown', handleKeyDown);
  //   };
  // });

  return (
    <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0'>
      <div className='md:flex  dark:bg-zinc-950 dark:text-gray-100 w-64 min-w-64 h-full flex-col justify-between hidden top-0 left-0 border-r border-gray-800 fixed'>
        <nav className='px-6 py-4 space-y-4'>
          <h1 className='font-mono text-2xl py-2 font-medium text-gray-900 dark:text-gray-100'>
            matt-wigg-dot-com
          </h1>
          <Link href='/' legacyBehavior>
            <Button
              className={` dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full dark:hover:text-yellow-400 ${
                pathname === '/' ? 'text-yellow-400' : 'dark:text-gray-100'
              }`}
            >
              <UserCircleIcon className='h-6 w-6 text-yellow-400' />
              <span className='ml-4'>
                {/* <span
                  className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out bg-gray-200 dark:bg-gray-700 
    `}
                >
                  a.
                </span> */}
                About
              </span>
            </Button>
          </Link>
          <Link href='/projects' legacyBehavior>
            <Button
              className={` dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full dark:hover:text-yellow-400 ${
                pathname === '/projects'
                  ? 'text-yellow-400'
                  : 'dark:text-gray-100'
              }`}
            >
              <CommandLineIcon className='h-6 w-6 text-yellow-400' />
              <span className='ml-4'>
                {/* <span
                  className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 'bg-gray-400 bg-gray-300 dark:bg-zinc-900''
    `}
                >
                  p.
                </span> */}
                Projects
              </span>
            </Button>
          </Link>
          <Link href='/blog' legacyBehavior>
            <Button
              className={` dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full dark:hover:text-yellow-400 ${
                pathname === '/blog' ? 'text-yellow-400' : 'dark:text-gray-100'
              }`}
            >
              <BookOpenIcon className='h-6 w-6 text-yellow-400' />
              <span className='ml-4'>
                {/* <span
                  className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 bg-gray-400 
    `}
                >
                  b.
                </span> */}
                Blog
              </span>
            </Button>
          </Link>
          <Link href='/contact' legacyBehavior>
            <Button
              className={` dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full dark:hover:text-yellow-400 ${
                pathname === '/contact'
                  ? 'text-yellow-400'
                  : 'dark:text-gray-100'
              }`}
            >
              <PencilSquareIcon className='h-6 w-6 text-yellow-400' />
              <span className='ml-4'>
                {/* <span
                  className={`inline-block text-white dark:text-gray-400 rounded px-2 py-1 text-xs mr-2 transition duration-150 ease-in-out'bg-gray-200 dark:bg-gray-700 'bg-gray-400 bg-gray-300 dark:bg-zinc-900''
    `}
                >
                  c.
                </span> */}
                Contact
              </span>
            </Button>
          </Link>
          <ToggleTheme />
        </nav>
      </div>

      <div className='w-full'>
        {/* Mobile Navbar */}
        <div className='md:hidden flex items-center justify-between bg-white dark:bg-zinc-950 p-4 border-b-2 border-gray-800 dark:border-gray-700'>
          <p className='text-gray-900 dark:text-white font-mono'>
            matt-wigg-dot-com
          </p>
          <Button
            className='text-yellow-400 bg-transparent'
            onClick={toggleMenu}
          >
            <svg
              className='w-6 h-6 text-gray-900 dark:text-white'
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
          </Button>
        </div>
        {isOpen && (
          <nav className='border-b-2 border-gray-800 dark:border-gray-700 md:hidden bg-white dark:bg-zinc-950 p-4 space-y-2 absolute top-16 w-full z-10'>
            <div className='flex flex-col w-full space-y-2'>
              <Link href='/' legacyBehavior>
                <Button
                  className={`bg-gray-100 dark:bg-zinc-950 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full ${
                    pathname === '/'
                      ? 'text-yellow-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                  onClick={() => toggleMenu()}
                >
                  <UserCircleIcon className='h-6 w-6 text-yellow-400' />
                  <span className='ml-4'>About</span>
                </Button>
              </Link>
              <Link href='/projects' legacyBehavior>
                <Button
                  className={`bg-gray-100 dark:bg-zinc-950 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full ${
                    pathname === '/projects'
                      ? 'text-yellow-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                  onClick={() => toggleMenu()}
                >
                  <CommandLineIcon className='h-6 w-6 text-yellow-400' />
                  <span className='ml-4'>Projects</span>
                </Button>
              </Link>
              <Link href='/blog' legacyBehavior>
                <Button
                  className={`bg-gray-100 dark:bg-zinc-950 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full ${
                    pathname === '/blog'
                      ? 'text-yellow-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                  onClick={() => toggleMenu()}
                >
                  <BookOpenIcon className='h-6 w-6 text-yellow-400' />
                  <span className='ml-4'>Blog</span>
                </Button>
              </Link>
              <Link href='/contact' legacyBehavior>
                <Button
                  className={`bg-gray-100 dark:bg-zinc-950 hover:bg-gray-200 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start w-full ${
                    pathname === '/contact'
                      ? 'text-yellow-400'
                      : 'text-gray-900 dark:text-gray-100'
                  }`}
                  onClick={() => toggleMenu()}
                >
                  <PencilSquareIcon className='h-6 w-6 text-yellow-400' />
                  <span className='ml-4'>Contact</span>
                </Button>
              </Link>
            </div>
            <ToggleTheme />
          </nav>
        )}
        {/* Content */}
      </div>
    </div>
  );
};

export default Navbar;

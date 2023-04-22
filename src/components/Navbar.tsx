'use client';
import React, { useState } from 'react';
import {
  HomeIcon,
  CommandLineIcon,
  PencilSquareIcon,
  BookOpenIcon,
} from '@heroicons/react/24/solid';
import Link from 'next/link';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className='flex flex-col md:flex-row md:space-x-4 md:space-y-0'>
      <div className='md:flex bg-zinc-950 text-gray-100 w-64 h-screen flex-col justify-between hidden absolute top-0 left-0 border-r border-gray-800'>
        <nav className='px-6 py-4 space-y-2'>
          <h1 className='text-yellow-400 font-mono px-6 py-4'>
            matt-wigg-dot-com
          </h1>
          <Link href='/' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'>
              <HomeIcon className='h-6 w-6 mr-4 text-yellow-400' />
              About
            </button>
          </Link>
          <Link href='/projects' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'>
              <CommandLineIcon className='h-6 w-6 mr-4 text-yellow-400' />
              Projects
            </button>
          </Link>
          <Link href='/blog' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'>
              <BookOpenIcon className='h-6 w-6 mr-4 text-yellow-400' />
              Blog
            </button>
          </Link>
          <Link href='/contact' legacyBehavior>
            <button className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'>
              <PencilSquareIcon className='h-6 w-6 mr-4 text-yellow-400' />
              Contact
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
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <HomeIcon className='h-6 w-6 mr-4 text-yellow-400' />
                About
              </button>
            </Link>
            <Link href='/projects' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <CommandLineIcon className='h-6 w-6 mr-4 text-yellow-400' />
                Projects
              </button>
            </Link>
            <Link href='/blog' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'
                onClick={() => toggleMenu()}
              >
                <BookOpenIcon className='h-6 w-6 mr-4 text-yellow-400' />
                Blog
              </button>
            </Link>
            <Link href='/contact' legacyBehavior>
              <button
                className='flex items-center px-4 py-2 font-medium rounded transition duration-200 hover:bg-gray-800 w-full text-left'
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

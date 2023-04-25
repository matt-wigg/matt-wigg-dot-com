'use client';

// components/SocialLinks.tsx

import React from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Button from './Button';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://github.com/matt-wigg/',
    icon: FaGithub,
  },
  {
    href: 'https://www.linkedin.com/in/matt-wigg/',
    icon: FaLinkedin,
  },
  {
    href: 'https://www.instagram.com/__matt_wigg/',
    icon: FaInstagram,
  },
  {
    href: 'https://twitter.com/MrSoftwareGuy',
    icon: FaTwitter,
  },
];

const SocialLinks = () => {
  return (
    <div className='flex items-center justify-start space-x-4'>
      {socialLinks.map(({ href, icon: Icon }) => (
        <Link key={href} href={href} target='_blank' passHref>
          <Button className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-yellow-400 transition-colors duration-200'>
            <Icon className='h-4 w-4' />
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;

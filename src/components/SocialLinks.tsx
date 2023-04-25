import { ArrowDownCircleIcon } from '@heroicons/react/24/outline';
import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';

const SocialLinks = () => {
  return (
    <div className='flex items-center justify-start space-x-4'>
      <a
        href='https://github.com/matt-wigg/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-yellow-400 transition-colors duration-200'
      >
        <FaGithub className='h-4 w-4' />
      </a>
      <a
        href='https://www.linkedin.com/in/matt-wigg/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-yellow-400 transition-colors duration-200'
      >
        <FaLinkedin className='h-4 w-4' />
      </a>
      <a
        href='https://www.instagram.com/__matt_wigg/'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-yellow-400 transition-colors duration-200'
      >
        <FaInstagram className='h-4 w-4' />
      </a>
      <a
        href='https://twitter.com/MrSoftwareGuy'
        target='_blank'
        rel='noopener noreferrer'
        className='text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-yellow-400 transition-colors duration-200'
      >
        <FaTwitter className='h-4 w-4' />
      </a>
    </div>
  );
};

export default SocialLinks;

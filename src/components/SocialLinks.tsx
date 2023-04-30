import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';

const socialLinks = [
  {
    href: 'https://github.com/matt-wigg/',
    icon: FaGithub,
    hover: 'hover:text-black dark:hover:text-white',
  },
  {
    href: 'https://www.linkedin.com/in/matt-wigg/',
    icon: FaLinkedin,
    hover: 'hover:text-blue-500 dark:hover:text-blue-400',
  },
  {
    href: 'https://www.instagram.com/__matt_wigg/',
    icon: FaInstagram,
    hover: 'hover:text-pink-500 dark:hover:text-pink-400',
  },
  {
    href: 'https://twitter.com/MrSoftwareGuy',
    icon: FaTwitter,
    hover: 'hover:text-blue-500 dark:hover:text-blue-400',
  },
];

const SocialLinks = () => {
  return (
    <div className='flex items-center justify-start space-x-4'>
      {socialLinks.map(({ href, icon: Icon, hover }) => (
        <Link key={href} href={href} legacyBehavior>
          <a
            target='_blank'
            rel='noopener noreferrer'
            className={`group bg-white dark:bg-zinc-950 hover:bg-gray-100 dark:hover:bg-zinc-900 rounded-md px-4 py-2 border border-gray-700 dark:border-gray-700 flex items-center justify-start focus:outline-none focus:ring-1 focus:ring-yellow-400 ${hover} dark:focus:ring-yellow-400`}
          >
            <Icon className='h-4 w-4' />
          </a>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;

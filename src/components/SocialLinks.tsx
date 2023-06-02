import { FaGithub, FaLinkedin, FaTwitter, FaInstagram } from 'react-icons/fa';
import Link from 'next/link';
import Button from '@/components/Button';

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
        <Link key={href} href={href} target='_blank'>
          <Button className={`group ${hover}`}>
            <Icon className='h-4 w-4' />
          </Button>
        </Link>
      ))}
    </div>
  );
};

export default SocialLinks;

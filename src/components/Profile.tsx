'use client';
import Image from 'next/image';
import SocialLinks from './SocialLinks';
import { useState } from 'react';
import { ChevronDownIcon } from '@heroicons/react/24/outline';
import Button from './Button';

const Profile = () => {
  const [contentVisible, setContentVisible] = useState(true);

  const toggleContentVisibility = () => {
    setContentVisible(!contentVisible);
  };

  return (
    <section className='container px-4 flex flex-col max-w-3xl text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header
          onClick={toggleContentVisibility}
          className='group p-4 sm:px-6 flex justify-between items-center cursor-pointer hover:bg-gray-100 dark:hover:bg-zinc-900'
        >
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100 group-hover:text-yellow-400 dark:group-hover:text-yellow-400'>
              Profile
            </h3>
          </div>
          <Button onClick={toggleContentVisibility}>
            <ChevronDownIcon
              className={`h-4 w-4 transform transition duration-300 ${
                contentVisible ? ' text-yellow-400' : 'rotate-180'
              }`}
            />
          </Button>
        </header>
        {contentVisible && (
          <div>
            <div className='border-t border-gray-700 dark:border-gray-700 py-4 sm:px-6'>
              <div className='flex flex-col sm:flex-row items-center'>
                <div className='relative h-24 w-24 border dark:border-gray-800 sm:mr-8 mb-4 sm:mb-0 rounded-full overflow-hidden'>
                  <Image
                    src='/my-nft-bb.png' // Replace with the correct path to your profile picture
                    alt='Profile Picture'
                    width={100}
                    height={100}
                    priority
                  />
                </div>
                <div className='text-center sm:text-left'>
                  <div className='text-gray-900 dark:text-gray-300 font-semibold'>
                    Matthew Wigglesworth
                  </div>
                  <div className='text-gray-500 dark:text-gray-400 font-extralight'>
                    Software Engineer
                  </div>
                  <div className='text-gray-500 dark:text-gray-400 font-extralight'>
                    San Diego, CA
                  </div>
                  <div className='text-gray-500 dark:text-gray-400 font-extralight pt-3'>
                    <span>
                      <SocialLinks />
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className='px-4 py-3 sm:px-6'>
              <p className='font-light text-gray-500 dark:text-gray-400 pb-3'>
                I&apos;m a full-stack software engineer originally from England,
                now living in San Diego. In my spare time I enjoy surfing,
                hiking, poker, and soccer (football). I hope to one day own a
                dog.
              </p>
            </div>
          </div>
        )}
      </article>
    </section>
  );
};

export default Profile;

import Image from 'next/image';
import ContentCard from '@/components/ContentCard/ContentCard';
import SocialLinks from '@/components/SocialLinks';

const Profile = () => {
  return (
    <ContentCard
      show={true}
      title='Profile'
      content={
        <>
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='relative sm:mr-8 mb-4 sm:mb-0 min-w-24 min-h-24 w-24 h-24 overflow-hidden rounded-full border dark:border-gray-800'>
              <div className='absolute inset-0'>
                <Image
                  src='/my-nft-bb.png'
                  alt='Profile Picture'
                  fill={true}
                  priority
                  className='object-cover'
                />
              </div>
            </div>
            <div className='text-center sm:text-left'>
              <div className='font-semibold text-gray-900 dark:text-gray-300'>
                Matthew Wigglesworth
              </div>
              <div className='font-extralight text-gray-500 dark:text-gray-400'>
                Software Engineer
              </div>
              <div className='font-extralight text-gray-500 dark:text-gray-400'>
                San Diego, CA
              </div>
              <div className='pt-3 font-extralight text-gray-500 dark:text-gray-400'>
                <SocialLinks />
              </div>
            </div>
          </div>
          <div className='pt-4'>
            <p className='font-light text-gray-700 dark:text-gray-400'>
              I&apos;m a full-stack software engineer originally from England,
              now living in San Diego. In my spare time I enjoy surfing, hiking,
              poker, and soccer (football). I own a goldendoodle dog by the name
              of Charlie.
            </p>
          </div>
        </>
      }
    />
  );
};

export default Profile;

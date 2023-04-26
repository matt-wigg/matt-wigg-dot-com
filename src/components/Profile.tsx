import Image from 'next/image';
import SocialLinks from './SocialLinks';

const Profile = () => {
  return (
    <section className='container px-4 flex flex-col max-w-3xl text-sm'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header className='p-4 sm:px-6'>
          <div>
            <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
              Profile
            </h3>
          </div>
        </header>
        <div className='py-1 sm:px-6'>
          <div className='flex flex-col sm:flex-row items-center'>
            <div className='relative h-20 w-20 border dark:border-gray-800 sm:mr-8 mb-4 sm:mb-0 rounded-full overflow-hidden'>
              <Image
                src='/my-nft-bb.png' // Replace with the correct path to your profile picture
                alt='Profile Picture'
                width={100}
                height={100}
                priority
              />
            </div>
            <div className='text-center sm:text-left '>
              <p className='text-gray-900 dark:text-gray-300 font-semibold'>
                Matthew Wigglesworth
              </p>
              <p className='text-gray-500 dark:text-gray-400 font-extralight'>
                Software Developer
              </p>
              <p className='text-gray-500 dark:text-gray-400 font-extralight'>
                San Diego, CA
              </p>
              <p className='text-gray-500 dark:text-gray-400 font-extralight pt-3'>
                <SocialLinks />
              </p>
            </div>
          </div>
        </div>
        <div className='px-4 py-3 sm:px-6'>
          <p className='font-light text-gray-500 dark:text-gray-400 pb-3'>
            I&apos;m a full-stack software developer originally from England,
            now living in San Diego. In my spare time I enjoy surfing, hiking,
            poker, and soccer (football). I hope to one day own a dog.
          </p>
        </div>
      </article>
    </section>
  );
};

export default Profile;

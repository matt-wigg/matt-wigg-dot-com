import Image from 'next/image';

const Profile = () => {
  return (
    <section className='container px-4 flex flex-col max-w-3xl'>
      <article className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800'>
        <header className='p-4 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-gray-100'>
            Profile
          </h3>
        </header>
        <div className='py-1 sm:px-6 w-fit'>
          <div className='flex items-center'>
            <div className='relative h-16 w-16 mr-6 rounded-full overflow-hidden'>
              <Image
                src='/my-nft-bb.png' // Replace with the correct path to your profile picture
                alt='Profile Picture'
                width={100}
                height={100}
                priority
              />
            </div>
            <div>
              <p className='text-gray-900 dark:text-gray-300 font-semibold'>
                Matthew Wigglesworth
              </p>
              {/* <p className='text-gray-500 dark:text-gray-400 font-light'>34</p> */}
              <p className='text-gray-500 dark:text-gray-400 text-sm font-extralight'>
                He / Him / His
              </p>
              <p className='text-gray-500 dark:text-gray-400 text-sm font-extralight'>
                San Diego, CA
              </p>
            </div>
          </div>
        </div>
        <div className='px-4 py-3 sm:px-6 w-fit '>
          <p className='text-sm text-gray-500 dark:text-gray-400 pb-3'>
            I&apos;m a full-stack software engineer originally from England, now
            living in San Diego. In my spare time I enjoy surfing, hiking, and
            soccer (football). I hope to one day own a dog.
          </p>
        </div>
      </article>
    </section>
  );
};

export default Profile;

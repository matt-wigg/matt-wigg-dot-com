import Image from 'next/image';

const Profile = () => {
  return (
    <div className='container px-4 flex flex-col max-w-3xl'>
      <div className='bg-white dark:bg-zinc-950 shadow rounded-lg overflow-hidden border border-gray-800 '>
        <div className='px-4 py-4 sm:px-6'>
          <h3 className='text-lg font-medium leading-6 text-gray-900 dark:text-white'>
            Profile
          </h3>
        </div>
        <div className='px-4 py-3 sm:px-6 w-fit'>
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
            <div className='text-sm'>
              <p className='text-gray-900 dark:text-gray-400 font-medium'>
                Name: Matthew Wigglesworth
              </p>
              <p className='text-gray-500 dark:text-gray-500'>Age: 34</p>
              <p className='text-gray-500 dark:text-gray-500'>
                Location: San Diego, CA
              </p>
            </div>
          </div>
        </div>
        <div className='px-4 py-3 sm:px-6 w-fit '>
          <p className='text-sm text-gray-500 dark:text-gray-500 pb-3'>
            I&apos;m a full-stack software engineer hailing from England, now
            living in sunny San Diego. Devoted Leeds United fan with dreams of
            adopting a canine companion.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Profile;

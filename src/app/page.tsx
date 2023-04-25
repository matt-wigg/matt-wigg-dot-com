import HomeTabs from '@/components/HomeTabs/HomeTabs';
import ResumeDownload from '@/components/ResumeDownload';
import Profile from '@/components/Profile';
import HomeContactForm from '@/components/ContactForm';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <>
      <main className='flex md:flex-row flex-col pt-4'>
        <div className='md:w-3/5 md:flex md:flex-col'>
          <div className='pb-4'>
            <HomeTabs />
          </div>
        </div>
        <div className='md:w-2/5 md:flex md:flex-col'>
          <div className='pb-4'>
            <Profile />
          </div>
          <div className='pb-4'>
            <ResumeDownload />
          </div>
          <div className='pb-4'>
            <HomeContactForm show={false} />
          </div>
        </div>
      </main>
    </>
  );
}

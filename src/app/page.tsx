import HomeTabs from '@/components/HomeTabs/HomeTabs';
import ResumeDownload from '@/components/ResumeDownload';
import Profile from '@/components/Profile';
import HomeContactForm from '@/components/HomeContactForm';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className='flex md:flex-row flex-col justify-end'>
      <HomeTabs />
      <span>
        <div>
          <Profile />
        </div>
        <div className='pt-4'>
          <ResumeDownload />
        </div>
        <div className='pt-4'>
          <HomeContactForm />
        </div>
      </span>
    </main>
  );
}

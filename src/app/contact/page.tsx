import { Inter } from 'next/font/google';
import HomeContactForm from '@/components/ContactForm';

const inter = Inter({ subsets: ['latin'] });

export default function Contact() {
  return (
    <main className='flex md:flex-row flex-col pt-4'>
      <div className=' md:w-2/5 md:flex md:flex-col'>
        <HomeContactForm />
      </div>
      <div className='md:w-3/5 md:flex md:flex-col'>
        <div className='pb-4'></div>
      </div>
    </main>
  );
}

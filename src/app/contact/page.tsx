import { Inter } from 'next/font/google';
import ContactForm from '@/components/ContactForm';

const inter = Inter({ subsets: ['latin'] });

export default function Contact() {
  return (
    <main className='flex md:flex-row flex-col pt-4'>
      <div className='md:flex md:flex-col'>
        <ContactForm show={true} />
      </div>
      <div className='md:w-3/5 md:flex md:flex-col'>
        <div className='pb-4'></div>
      </div>
    </main>
  );
}

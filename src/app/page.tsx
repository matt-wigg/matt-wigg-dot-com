import HomeTabs from '@/components/HomeTabs/HomeTabs';
import ResumeDownload from '@/components/ResumeDownload';
import Profile from '@/components/Profile';
import ContactForm from '@/components/ContactForm';
import Testimonials from '@/components/Testimonials';
import ProfesionalTimeline from '@/components/ProfesionalTimeline';

export default function Home() {
  return (
    <>
      <main className='flex md:flex-row flex-col pt-8'>
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
            <ProfesionalTimeline />
          </div>
          <div className='pb-4'>
            <Testimonials />
          </div>
          <div className='pb-4'>
            <ResumeDownload />
          </div>
          <div className='pb-4'>
            <ContactForm show={false} />
          </div>
        </div>
      </main>
    </>
  );
}

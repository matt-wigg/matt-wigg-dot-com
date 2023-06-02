import ContactForm from '@/components/ContactForm';

export default function Contact() {
  return (
    <main className='flex md:flex-row flex-col pt-8'>
      <div className='md:w-3/6 md:min-w-[500px] md:flex md:flex-col'>
        Contact Page: under construction.
        <div className='py-4'>
          <ContactForm show={true} />
        </div>
      </div>
      <div className='md:w-3/6 md:flex md:flex-col'>
        <div className='pb-4'></div>
      </div>
    </main>
  );
}

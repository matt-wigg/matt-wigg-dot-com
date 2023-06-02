import ChatForm from '@/components/ChatForm';
import AudioForm from '@/components/AudioForm/AudioForm';

export default function Home() {
  return (
    <main className='flex md:flex-row flex-col pt-8'>
      <div className='md:w-3/6 md:min-w-[500px] md:flex md:flex-col'>
        Projects Page: under construction.
        <div className='py-4'>
          <ChatForm show={true} />
        </div>
      </div>
      <div className='md:w-3/6 md:flex md:flex-col'>
        <div className='pb-4'>
          <AudioForm show={true} />
        </div>
      </div>
    </main>
  );
}

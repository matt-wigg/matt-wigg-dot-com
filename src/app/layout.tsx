import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Matt Wigg: Software Engineer',
  description:
    'I am a software engineer based in San Diego, CA. I specialize in building web applications using React, Node.js, and TypeScript. I am passionate about creating accessible and inclusive experiences for all users.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body>
        <div className='min-h-screen relative'>
          <Navbar />
          <main className='md:pl-64 md:w-auto md:flex-1 overflow-auto flex flex-col md:flex-row'>
            <div className='container mx-auto px-4'>{children}</div>
          </main>
        </div>
      </body>
    </html>
  );
}

import './globals.css';
import { Inter } from 'next/font/google';
import Navbar from '../components/Navbar';
import HeaderNotification from '@/components/HeaderNotification';
import { ThemeProvider } from '@/hooks/ThemeContext';

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
        <ThemeProvider>
          <div className='min-h-screen relative'>
            <Navbar />
            <main className='md:pl-64 '>
              <HeaderNotification />
              <div className='container mx-auto px-4'>{children}</div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

import HomeTabs from '../components/HomeTabs';
import { Inter } from 'next/font/google';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <HomeTabs />
    </main>
  );
}

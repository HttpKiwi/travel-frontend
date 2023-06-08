import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import bg from 'public/bgr.jpg';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <div
        className={styles.container}
      >
        <Header />
        <Hero />
      </div>
    </main>
  );
}

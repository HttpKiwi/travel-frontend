"use client";
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import bg from 'public/bgr.jpg';
import { useCallback, useState } from 'react';
import { Itinerary } from '@/pages/interfaces/responses';
import ResultCard from './components/ResultCard/ResultCard';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [itineraries, setItineraries] = useState<Itinerary[]>([])

  const setItinerariesCallback = useCallback((data: Itinerary[]) => {
    setItineraries(data)
  }, [])

  return (
    <main>
      <div
        className={styles.container}
      >
        <Header />
        <Hero setItineraries={setItinerariesCallback} />
        <ResultCard itineraries={itineraries} />
      </div>
    </main>
  );
}

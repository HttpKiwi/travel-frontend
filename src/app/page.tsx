"use client";
import Image from 'next/image';
import { Inter } from '@next/font/google';
import styles from './page.module.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import bg from 'public/bgr.jpg';
import { useCallback, useState } from 'react';
import { Itinerary } from '@/app/interfaces/responses';
import ResultCard from './components/ResultCard/ResultCard';
import { SolverSolution } from './interfaces/solverSolution.model';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [solutions, setSolutions] = useState<SolverSolution[]>([])

  const setSolutionsCallback = useCallback((data: SolverSolution[]) => {
    setSolutions(data)
  }, [])

  return (
    <main>
      <div
        className={styles.container}
      >
        <Header />
        <Hero setSolutions={setSolutionsCallback} />
        <ResultCard solutions={solutions} />
      </div>
    </main>
  );
}

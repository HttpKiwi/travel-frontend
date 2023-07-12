"use client";
import styles from './page.module.css';
import Hero from './components/Hero/Hero';
import Header from './components/Header/Header';
import { useCallback, useState } from 'react';
import ResultCard from './components/ResultCard/ResultCard';
import { SolverSolution } from './interfaces/solverSolution.model';
import LoadingOverlay from 'react-loading-overlay-ts';


export default function Home() {
  const [solutions, setSolutions] = useState<SolverSolution[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const setSolutionsCallback = useCallback((data: SolverSolution[]) => {
    setSolutions(data)
  }, [])

  const setIsLoadingCallback = useCallback((data: boolean) => {
    setIsLoading(data)
  }, [])

  return (
    <main>
      <LoadingOverlay
        active={isLoading}
        spinner
        text='Encontrando tu mejor opción de viaje, esto pueder tardar entre 7 y 15 minutos'
      >
        <div
          className={styles.container}
        >
          <Header />
          <Hero setSolutions={setSolutionsCallback} setIsLoading={setIsLoadingCallback} />
          <ResultCard solutions={solutions} />
        </div>
      </LoadingOverlay>
    </main>
  );
}

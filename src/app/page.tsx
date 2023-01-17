import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from './page.module.css'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <main className={styles.main}>
      <Image
        src="https://pbs.twimg.com/media/Eh-czkMWAAUVkGb.png"
        alt="Test"
        width={300}
        height={400}
      />
    </main>
  )
}

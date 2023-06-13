import './globals.css'
import Header from './components/Header/Header'
import { Roboto } from '@next/font/google'

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"]
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {


  return (
    <html lang="es">
      <head />
      <body>
        <div className={roboto.className}>
          {children}
        </div>
      </body>
    </html>
  )
}

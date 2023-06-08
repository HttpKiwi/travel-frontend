import './globals.css'
import Header from './components/Header/Header'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <head />
      <body>
        <div>
          {children}
        </div>
      </body>
    </html>
  )
}

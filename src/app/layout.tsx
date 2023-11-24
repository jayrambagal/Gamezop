import Navbar from '@/components/Navbar/Navbar'
import type { Metadata } from 'next'
import '../styles/globals.css'

export const metadata: Metadata = {
  title: 'Gamezop App',
  description: 'Play your favorite games',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className='body'>
        <Navbar />
        {children}
      </body>
    </html>
  )
}

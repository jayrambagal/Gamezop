import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar/Navbar'
import NextTopLoader from 'nextjs-toploader';


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
        <NextTopLoader showSpinner={false} color="#3e51b5" />
        <Navbar />
        {children}
      </body>
    </html>
  )
}

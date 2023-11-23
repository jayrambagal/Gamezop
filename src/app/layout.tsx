import type { Metadata } from 'next'
import '../styles/globals.css'
import Navbar from '@/components/Navbar/Navbar'

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
        {/* <Navbar /> */}
        {children}
      </body>
    </html>
  )
}

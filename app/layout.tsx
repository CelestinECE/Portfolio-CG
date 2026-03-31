import type { Metadata } from 'next'
import { Inter, Space_Mono } from 'next/font/google'
import '@/styles/globals.css'
import Navbar from '@/components/ui/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-space-mono',
})

export const metadata: Metadata = {
  title: 'Celestin Guilhen — Portfolio',
  description: 'Ingénieur IA & Systèmes d\'Information — ECE Lyon',
  icons: {
    icon: '/images/Logo_CG.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${spaceMono.variable}`}>
      <body className="font-body antialiased">
        <Navbar />
        {children}
      </body>
    </html>
  )
}

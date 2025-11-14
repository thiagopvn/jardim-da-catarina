import type { Metadata } from 'next'
import { Inter, Dancing_Script } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })
const dancingScript = Dancing_Script({
  subsets: ['latin'],
  variable: '--font-dancing-script',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Convite Catarina - 1 Aninho',
  description: 'Venha celebrar o primeiro aninho da princesa Catarina no Jardim Encantado',
  keywords: 'convite, aniversário, 1 ano, catarina, jardim encantado',
  openGraph: {
    title: 'Convite Catarina - 1 Aninho',
    description: 'Venha celebrar o primeiro aninho da princesa Catarina',
    images: ['/images/og-image.jpg'],
    type: 'website',
  },
  robots: 'noindex, nofollow',
  themeColor: '#FFB6C1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
      </head>
      <body className={`${inter.className} ${dancingScript.variable} antialiased`}>
        {children}
      </body>
    </html>
  )
}
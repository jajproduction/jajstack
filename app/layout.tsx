import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/themes/theme-provider'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  // metadataBase: new URL("#"), // Replace this to your domain
  // alternates: { canonical: "/" },

  title: {
    default: 'JajStack',
    template: '%s | JajStack'
  },
  description: 'A modern Next.js starter template with a landing page and built-in authentication.'
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body className={`${inter.className} tracking-tighter antialiased`}>
        <ThemeProvider attribute='class' defaultTheme='light'>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}

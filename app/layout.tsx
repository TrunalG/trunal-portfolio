import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { SmoothScroll } from '@/components/SmoothScroll'
import { PageTransitionProvider } from '@/components/layout/PageTransition'
import { Navbar } from '@/components/layout/Navbar'
import { CustomCursor } from '@/components/ui/CustomCursor'
import './globals.css'

export const metadata: Metadata = {
  title: 'Trunal — Designer, Developer, Product Builder',
  description: 'Trunal designs and builds digital products, from early ideas and product structure to interfaces and working experiences.',
  generator: 'v0.app',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-32x32.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    shortcut: '/favicon.ico',
    apple: '/apple-touch-icon.png',
  },
}

export const viewport: Viewport = {
  colorScheme: 'light dark',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <CustomCursor />
        <SmoothScroll>
          <PageTransitionProvider>
            <Navbar />
            {children}
          </PageTransitionProvider>
        </SmoothScroll>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}

import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://ddd-conferences.github.io';

export const metadata: Metadata = {
  title: 'DDD (Developer Developer Developer) Conferences | UK Developer Events',
  description: 'Discover DDD (Developer Developer Developer) conferences across the UK. Connect with fellow developers, find upcoming events, accommodation, and join our communities. Free community-driven developer conferences.',
  keywords: ['DDD conferences', 'Developer Developer Developer', 'UK developer events', 'developer conferences', 'software development', 'tech conferences UK', 'DDD North', 'DDD East Midlands', 'DDD Southwest', 'developer community'],
  authors: [{ name: 'DDD Conferences' }],
  creator: 'DDD Conferences',
  publisher: 'DDD Conferences',
  icons: {
    icon: '/icon.svg',
  },
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: 'DDD (Developer Developer Developer) Conferences',
    description: 'Discover DDD conferences across the UK. Free community-driven developer events connecting developers nationwide.',
    url: siteUrl,
    siteName: 'DDD Conferences',
    locale: 'en_GB',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DDD (Developer Developer Developer) Conferences',
    description: 'Discover DDD conferences across the UK. Free community-driven developer events.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}

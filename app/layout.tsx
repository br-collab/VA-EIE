import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'VA-EIE | VA Evidence Intelligence Engine',
  description:
    'VA Evidence Intelligence Engine — Federal VA contract pitch application. Confidential commercial brief.',
  robots: 'noindex, nofollow',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

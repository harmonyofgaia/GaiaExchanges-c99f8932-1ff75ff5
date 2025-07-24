import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'GAIA Exchanges - Admin Portal',
  description: 'Secure Admin Portal for GAIA Exchanges',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
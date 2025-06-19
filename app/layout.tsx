import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Chat Based Medical Diagnosis Program',
  description: 'Chat Based Medical Diagnosis Program built by Ibrahim Rahmon for CSC 320 Project',
  keywords: ['chat', 'medical', 'diagnosis', 'program', 'CSC 320', 'Ibrahim Rahmon'],
  authors: [{ name: 'Ibrahim Rahmon', url: 'https://health-consultant.vercel.app' }],
  creator: 'Ibrahim Rahmon',
  openGraph: {
    title: 'Chat Based Medical Diagnosis Program',
    description: 'Chat Based Medical Diagnosis Program built by Ibrahim Rahmon for CSC 320 Project',
    url: 'https://health-consultant.vercel.app',
    siteName: 'Chat Based Medical Diagnosis Program',
    images: [
      {
        url: 'https://health-consultant.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Chat Based Medical Diagnosis Program',
      },]
    },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <title>Chat Based Medical Diagnosis Program</title>
        <meta name="description" content="Chat Based Medical Diagnosis Program built by Ibrahim Rahmon for CSC 320 Project" />
      </head>
      <body>{children}</body>
    </html>
  )
}

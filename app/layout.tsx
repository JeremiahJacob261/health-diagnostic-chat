import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'v0 App',
  description: 'Created with v0',
  generator: 'v0.dev',
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

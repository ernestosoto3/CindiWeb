import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'WebCraft CRM',
  description: 'Internal client management',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'monospace', background: '#0a0a08', color: '#e8e8e2', minHeight: '100vh' }}>
        {children}
      </body>
    </html>
  )
}

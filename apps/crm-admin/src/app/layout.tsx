import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"

export const metadata: Metadata = {
  title: "CindiWeb CRM",
  description: "Internal client management",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-neutral-950 font-mono text-neutral-200">
        {children}
      </body>
    </html>
  )
}
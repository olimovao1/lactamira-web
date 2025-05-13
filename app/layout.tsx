import type React from "react"
import type { Metadata } from "next"
import { Inter, Nunito } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { ThemeToggle } from "@/components/theme-toggle"

// Load Nunito font
const nunito = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-nunito",
})

// Load Inter font as fallback
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Lactamira - Mother & Baby Care",
  description: "All-in-one health and care assistant for mothers and babies",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#FDF2F8" />
      </head>
      <body className={`${nunito.variable} ${inter.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <div className="relative">
            {children}
            <div className="fixed top-4 right-4 z-50">
              <ThemeToggle />
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  )
}

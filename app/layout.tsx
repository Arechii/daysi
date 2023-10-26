import { type Viewport } from "next"
import { Inter } from "next/font/google"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import Navbar from "components/navbar"
import { ThemeProvider } from "components/theme-provider"
import { Toaster } from "components/ui/toaster"
import { env } from "env.mjs"
import { twMerge } from "tailwind-merge"

import "~/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Daysi",
  description: "Track the days since certain events.",
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
}

export const viewport: Viewport = {
  themeColor: "#fb7185",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={twMerge(
          "flex h-screen flex-col gap-2 font-sans",
          inter.variable,
        )}
      >
        <ClerkProvider>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}
            <Toaster />
          </ThemeProvider>
        </ClerkProvider>
        <Analytics />
      </body>
    </html>
  )
}

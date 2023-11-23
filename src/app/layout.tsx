import { type Viewport } from "next"
import { Inter } from "next/font/google"
import { cookies } from "next/headers"
import { ClerkProvider } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { env } from "~/env"
import { twMerge } from "tailwind-merge"

import Navbar from "~/app/_components/navbar"
import { ThemeProvider } from "~/app/_components/theme-provider"
import { Toaster } from "~/app/_components/ui/toaster"

import "~/styles/globals.css"

import { TRPCReactProvider } from "~/trpc/react"

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
        <TRPCReactProvider cookies={cookies().toString()}>
          <ClerkProvider>
            <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
              <Navbar />
              {children}
              <Toaster />
            </ThemeProvider>
          </ClerkProvider>
        </TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  )
}

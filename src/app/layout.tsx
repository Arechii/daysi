import { Inter } from "next/font/google"
import { ClerkProvider, currentUser } from "@clerk/nextjs"
import { Analytics } from "@vercel/analytics/react"
import { twMerge } from "tailwind-merge"

import Navbar from "~/components/navbar"
import { ThemeProvider } from "~/components/theme-provider"

import "~/styles/globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
})

export const metadata = {
  title: "Daysi",
  description: "Track the days since certain events.",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await currentUser()

  return (
    <html lang="en">
      <body
        className={twMerge(
          "flex h-screen flex-col gap-2 font-sans",
          inter.variable
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <ClerkProvider>
            <Navbar
              username={user?.username}
              profileImageUrl={user?.profileImageUrl}
            />
            {children}
            <Analytics />
          </ClerkProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}

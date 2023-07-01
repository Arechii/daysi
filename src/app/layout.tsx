import { ClerkProvider, currentUser } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import Navbar from "~/components/navbar";
import { ThemeProvider } from "~/components/theme-provider";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Daysi",
  description: "Track the days since certain events.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  themeColor: "#fb7185",
  metadataBase: new URL(
    process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : `http://localhost:${process.env.PORT || 3000}`
  ),
  openGraph: {
    images: ["/icon.png"],
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await currentUser();

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
  );
}

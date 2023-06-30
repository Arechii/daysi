import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { Inter } from "next/font/google";
import { twMerge } from "tailwind-merge";
import "~/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Daysi",
  description: "Track the days since certain events.",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    images: ["/icon.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={twMerge(
            "bg-background text-foreground font-sans",
            inter.variable
          )}
        >
          {children}
          <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}

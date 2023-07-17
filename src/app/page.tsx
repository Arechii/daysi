import Link from "next/link"
import { auth, SignInButton } from "@clerk/nextjs"
import { LayoutDashboard, LogIn } from "lucide-react"

import { Button } from "~/components/ui/button"
import TypeAnim from "~/components/type-anim"

export const runtime = "edge"

export default function Home() {
  const { userId } = auth()

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-8 px-4 py-16 ">
        <h2 className="w-full text-center text-xl tracking-wide md:text-3xl">
          Remember the days since you <br /> <TypeAnim />
        </h2>
        {!userId ? (
          <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
            <Button variant="outline">
              <LogIn className="mr-2 h-4 w-4" /> Sign up
            </Button>
          </SignInButton>
        ) : (
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              <LayoutDashboard className="mr-2 h-4 w-4" /> Dashboard
            </Link>
          </Button>
        )}
      </div>
    </main>
  )
}

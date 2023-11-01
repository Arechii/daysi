import Link from "next/link"
import { auth, SignInButton } from "@clerk/nextjs"
import { LayoutDashboardIcon, LogInIcon } from "lucide-react"

import TypeAnim from "~/app/_components/type-anim"
import { Button } from "~/app/_components/ui/button"

export default function Home() {
  const { userId } = auth()

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <div className="container flex flex-col items-center justify-center gap-4 px-4 py-16 ">
        <h2 className="w-full text-center text-xl tracking-wide md:text-3xl">
          Remember the days since you <br /> <TypeAnim />
        </h2>
        {!userId ? (
          <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
            <Button variant="outline" className="flex gap-2">
              <LogInIcon className="h-4 w-4" /> Sign up
            </Button>
          </SignInButton>
        ) : (
          <Button asChild>
            <Link href="/dashboard" className="flex gap-2">
              <LayoutDashboardIcon className="h-4 w-4" /> Dashboard
            </Link>
          </Button>
        )}
      </div>
    </main>
  )
}

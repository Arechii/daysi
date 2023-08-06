import Link from "next/link"
import { currentUser, SignInButton } from "@clerk/nextjs"
import { FlowerIcon, LogInIcon } from "lucide-react"

import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import UserButton from "./user-button"

const Navbar = async () => {
  const user = await currentUser()

  return (
    <div className="sticky left-0 top-0 flex w-screen justify-between p-4">
      <Link href="/">
        <h1 className="flex items-center gap-2 text-2xl font-bold tracking-wide text-rose-400">
          <FlowerIcon /> Daysi
        </h1>
      </Link>
      <div className="flex flex-row-reverse gap-2">
        {user ? (
          <UserButton username={user.username} imageUrl={user.imageUrl} />
        ) : (
          <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
            <Button variant="outline" size="icon">
              <LogInIcon className="h-6 w-6" />
            </Button>
          </SignInButton>
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar

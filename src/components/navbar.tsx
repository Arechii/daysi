import Link from "next/link"
import { SignInButton } from "@clerk/nextjs"
import { type User } from "@clerk/nextjs/dist/types/server"
import { LogInIcon } from "lucide-react"

import ThemeToggle from "./theme-toggle"
import { Button } from "./ui/button"
import UserButton from "./user-button"

const Navbar = ({
  username,
  profileImageUrl,
}: Partial<Pick<User, "username" | "profileImageUrl">>) => {
  return (
    <div className="sticky left-0 top-0 flex w-screen justify-between p-4">
      <Link href="/">
        <h1 className="text-2xl font-extrabold tracking-tight text-rose-400">
          daysi
        </h1>
      </Link>
      <div className="flex flex-row-reverse gap-2">
        {username ? (
          <UserButton
            username={username}
            profileImageUrl={profileImageUrl ?? ""}
          />
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

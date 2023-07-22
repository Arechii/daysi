"use client"

import { useRouter } from "next/navigation"
import { SignInButton, SignOutButton } from "@clerk/nextjs"
import { LayoutDashboardIcon, LogInIcon, LogOutIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const UserButton = ({
  isSignedIn,
  username,
  profileImageUrl,
}: {
  isSignedIn: boolean
  username?: string | null
  profileImageUrl?: string
}) => {
  const router = useRouter()

  if (!isSignedIn) {
    return (
      <SignInButton afterSignInUrl="/dashboard" afterSignUpUrl="/dashboard">
        <Button variant="outline" size="icon">
          <LogInIcon className="h-6 w-6" />
        </Button>
      </SignInButton>
    )
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-9 w-9 select-none hover:cursor-pointer">
            <AvatarImage src={profileImageUrl} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboardIcon className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <SignOutButton signOutCallback={() => router.push("/")}>
          <DropdownMenuItem>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sign out
          </DropdownMenuItem>
        </SignOutButton>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton

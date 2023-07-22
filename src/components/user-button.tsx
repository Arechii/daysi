"use client"

import { useRouter } from "next/navigation"
import { SignInButton, SignOutButton, useUser } from "@clerk/nextjs"
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

const UserButton = () => {
  const { user, isSignedIn } = useUser()
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
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback>{user.username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{user.username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => router.push("/dashboard")}>
          <LayoutDashboardIcon className="mr-2 h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <SignOutButton>
            <LogOutIcon className="mr-2 h-4 w-4" />
            Sign out
          </SignOutButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton

"use client"

import { useRouter } from "next/navigation"
import { useAuth } from "@clerk/nextjs"
import { LayoutDashboardIcon, LogOutIcon } from "lucide-react"

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
  username,
  imageUrl,
}: {
  username?: string | null
  imageUrl?: string
}) => {
  const { signOut } = useAuth()
  const router = useRouter()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <Avatar className="h-9 w-9 select-none hover:cursor-pointer">
            <AvatarImage src={imageUrl} />
            <AvatarFallback>{username}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>{username}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => router.push("/dashboard")}
        >
          <LayoutDashboardIcon className="h-4 w-4" />
          Dashboard
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          className="flex gap-2"
          onClick={() => {
            router.push("/")
            void signOut()
          }}
        >
          <LogOutIcon className="h-4 w-4" />
          Sign out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

export default UserButton

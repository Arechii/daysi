import Link from "next/link"
import { type User } from "@clerk/nextjs/dist/types/server"
import { FlowerIcon } from "lucide-react"

import ThemeToggle from "./theme-toggle"
import UserButton from "./user-button"

const Navbar = ({ user }: { user: User | null }) => {
  return (
    <div className="sticky left-0 top-0 flex w-screen justify-between p-4">
      <Link href="/">
        <h1 className="flex items-center gap-1 text-2xl font-bold tracking-wide text-rose-400">
          <FlowerIcon /> Daysi
        </h1>
      </Link>
      <div className="flex flex-row-reverse gap-2">
        {user && (
          <UserButton
            username={user.username}
            profileImageUrl={user.profileImageUrl}
          />
        )}
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar

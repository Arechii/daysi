import Link from "next/link"
import { FlowerIcon } from "lucide-react"

import ThemeToggle from "./theme-toggle"
import UserButton from "./user-button"

const Navbar = () => {
  return (
    <div className="sticky left-0 top-0 flex w-screen justify-between p-4">
      <Link href="/">
        <h1 className="flex items-center gap-1 text-2xl font-bold tracking-wide text-rose-400">
          <FlowerIcon /> Daysi
        </h1>
      </Link>
      <div className="flex flex-row-reverse gap-2">
        <UserButton />
        <ThemeToggle />
      </div>
    </div>
  )
}

export default Navbar

"use client"

import { type User } from "@clerk/nextjs/dist/types/server"
import { ImageIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { Button } from "./ui/button"
import { Textarea } from "./ui/textarea"

const TimelineCreate = ({
  username,
  imageUrl,
}: Pick<User, "username" | "imageUrl">) => {
  return (
    <div className="mt-6 flex gap-6">
      <span className="-ml-3.5 flex h-7 w-7 shrink-0 items-center justify-center overflow-hidden rounded-full shadow-[0_0_0_6px_#fff] dark:shadow-[0_0_0_6px_#121212] md:-ml-5 md:h-10 md:w-10">
        <Avatar className="h-7 w-7 md:h-10 md:w-10">
          <AvatarImage src={imageUrl} />
          <AvatarFallback>{username?.[0]}</AvatarFallback>
        </Avatar>
      </span>
      <div className="flex w-full flex-col gap-2">
        <Textarea
          className="flex flex-col gap-4 rounded-md border-2 border-border p-4 shadow-sm"
          placeholder="Describe the reason for resetting..."
          rows={5}
        />
        <div className="flex gap-1 self-end">
          <Button size="sm" variant="outline">
            <ImageIcon />
          </Button>
          <Button size="sm" className="self-end">
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TimelineCreate

"use client"

import { TimerResetIcon } from "lucide-react"

import { type GetEvent } from "~/app/_actions/event"

import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const TimelineItem = ({
  user,
  note,
  image,
  createdAt,
}: GetEvent["resets"][number]) => {
  return (
    <div className="mt-6 flex gap-6">
      <span className="-ml-[52px] flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-amber-500 text-white shadow-[0_0_0_6px_#fff] dark:shadow-[0_0_0_6px_#121212]">
        <TimerResetIcon size={28} />
      </span>
      <div className="flex w-full flex-col gap-2">
        <div className="flex items-center gap-2 pt-1.5">
          <Avatar className="h-7 w-7">
            <AvatarImage src={user.profileImageUrl} />
            <AvatarFallback>{user.username?.[0]}</AvatarFallback>
          </Avatar>
          <span>
            <span className="font-bold">{user.username}</span> reset the event
            on {createdAt?.toLocaleDateString()}
          </span>
        </div>
        {(note ?? image) && (
          <div className="mt-3 flex flex-col gap-4 rounded-md border-2 border-zinc-200 p-4 shadow-sm dark:border-zinc-800">
            {note && <p>{note}</p>}
            {image && (
              <img
                className="w-48 rounded-md object-cover"
                src={image.url}
                alt="reset"
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default TimelineItem
"use client"

import Link from "next/link"
import { formatDate } from "~/utils"

import { type GetEvents } from "~/app/_actions/event"

import CreateReset from "./create-reset"
import DeleteEvent from "./delete-event"
import { Card, CardContent } from "./ui/card"
import { Separator } from "./ui/separator"

const EventCard = ({
  id,
  description,
  startedAt,
  daysSince,
  lastReset,
}: GetEvents[number]) => {
  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6">
        <p className="w-12 text-center text-2xl font-bold text-rose-400 md:w-20 md:text-3xl lg:text-4xl">
          {daysSince}
        </p>
        <div className="flex w-3/4 flex-col">
          <Link
            href={`/event/${id}`}
            className="break-all text-sm md:text-base lg:text-lg"
          >
            {description}
          </Link>
          <div className="flex h-5 flex-col items-start space-x-0 text-xs text-gray-500 dark:text-gray-400 md:flex-row md:items-center md:space-x-4 md:text-sm">
            <span>started on {formatDate(startedAt)}</span>
            {lastReset && (
              <>
                <Separator orientation="vertical" className="hidden md:block" />
                <span>last reset on {formatDate(lastReset)}</span>
              </>
            )}
          </div>
        </div>
        <div className="ml-auto flex flex-col gap-2 md:flex-row">
          <CreateReset eventId={id} />
          <DeleteEvent eventId={id} />
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard

"use client"

import { useEffect, useState } from "react"
import { type Event } from "~/db/schema"
import { TimerResetIcon, Trash2Icon } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const EventCard = ({ description, resetAt, createdAt }: Event) => {
  // workaround for hydration issue between server & client locale
  const [data, setData] = useState({ startedOn: "", daysSince: 0 })

  useEffect(
    () =>
      setData({
        startedOn: createdAt?.toLocaleDateString() ?? "",
        daysSince: Math.floor(
          Math.abs(resetAt.getTime() - new Date().getTime()) /
            (1000 * 3600 * 24)
        ),
      }),
    [createdAt, resetAt]
  )

  return (
    <Card>
      <CardContent className="flex items-center gap-4 pt-6 md:gap-8">
        <p className="w-12 text-center text-2xl font-bold text-rose-400 md:w-20 md:text-3xl lg:text-4xl">
          {data.daysSince}
        </p>
        <div className="flex w-3/4 flex-col">
          <p className="break-all text-sm md:text-base lg:text-lg">
            {description}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            started on {data.startedOn}
          </p>
        </div>
        <div className="ml-auto flex flex-col gap-2 md:flex-row">
          <Button variant="outline" size="icon">
            <TimerResetIcon />
          </Button>
          <Button variant="destructive" size="icon">
            <Trash2Icon />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default EventCard

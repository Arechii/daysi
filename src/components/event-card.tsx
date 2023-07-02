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
      <CardContent className="flex flex-row items-center gap-8 pt-6">
        <p className="text-4xl font-bold text-rose-400">{data.daysSince}</p>
        <div className="flex flex-col">
          <p className="text-xl">{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            started on {data.startedOn}
          </p>
        </div>
        <div className="ml-auto flex gap-2">
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

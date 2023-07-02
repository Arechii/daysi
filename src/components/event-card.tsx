"use client"

import { useEffect, useState } from "react"
import { type Event } from "~/db/schema"
import { TimerResetIcon } from "lucide-react"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"

const EventCard = ({ description, resetAt, createdAt }: Event) => {
  // workaround for hydration issue between server & client locale
  const [startedOn, setStartedOn] = useState("")

  useEffect(
    () => setStartedOn(createdAt?.toLocaleDateString() ?? ""),
    [createdAt]
  )

  return (
    <Card>
      <CardContent className="flex flex-row items-center gap-8 pt-6">
        <p className="text-4xl font-bold text-rose-400">
          {Math.floor(
            Math.abs(resetAt.getTime() - new Date().getTime()) /
              (1000 * 3600 * 24)
          )}
        </p>
        <div className="flex flex-col">
          <p className="text-xl">{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            started on {startedOn}
          </p>
        </div>
        <Button className="ml-auto" variant="outline" size="icon">
          <TimerResetIcon />
        </Button>
      </CardContent>
    </Card>
  )
}

export default EventCard

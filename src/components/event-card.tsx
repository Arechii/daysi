"use client"

import { useEffect, useState } from "react"
import { type Event } from "~/db/schema"

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
      <CardContent className="flex flex-row items-center justify-between gap-8 pt-6">
        <div className="flex flex-col">
          <p>{description}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            started on {startedOn}
          </p>
        </div>
        <p className="text-4xl font-bold text-rose-400">
          {Math.floor(
            Math.abs(resetAt.getTime() - new Date().getTime()) /
              (1000 * 3600 * 24)
          )}
        </p>
      </CardContent>
    </Card>
  )
}

export default EventCard

"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { type Event } from "~/db/schema"

import EventCard from "./event-card"

const Events = ({ events }: { events: Event[] }) => {
  const [parent] = useAutoAnimate()

  return (
    <div ref={parent} className="flex h-full flex-col gap-4 overflow-y-scroll">
      {events.map((e) => (
        <EventCard key={e.id} {...e} />
      ))}
    </div>
  )
}

export default Events

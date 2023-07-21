"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { type EventWithResets } from "~/db/schema"

import EventCard from "./event-card"

const Events = ({ events }: { events: EventWithResets[] }) => {
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

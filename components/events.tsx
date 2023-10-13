"use client"

import { useAutoAnimate } from "@formkit/auto-animate/react"
import { type GetEvents } from "app/_actions/event"

import EventCard from "./event-card"

const Events = ({ events }: { events: GetEvents }) => {
  const [parent] = useAutoAnimate()

  return (
    <div
      ref={parent}
      className="flex h-full flex-col gap-4 overflow-y-auto p-2"
    >
      {events.map((e) => (
        <EventCard key={e.id} {...e} />
      ))}
    </div>
  )
}

export default Events

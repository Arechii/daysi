import { CalendarHeartIcon } from "lucide-react"

import CreateEvent from "~/components/create-event"
import Events from "~/components/events"

import { getEvents } from "../_actions/event"

export const runtime = "edge"

export default async function Dashboard() {
  const events = await getEvents()

  return (
    <div className="container -mt-16 flex h-full flex-col gap-4 px-4 py-16">
      <div className="flex items-center justify-between">
        <h1 className="flex gap-1 text-xl font-semibold underline decoration-primary">
          <CalendarHeartIcon /> Events
        </h1>
        <CreateEvent />
      </div>
      <Events events={events} />
    </div>
  )
}

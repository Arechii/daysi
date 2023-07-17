import { CalendarHeartIcon } from "lucide-react"

import CreateEvent from "~/components/create-event"
import Events from "~/components/events"

import { getEvents } from "../_actions/event"

export const runtime = "edge"

export default async function Dashboard() {
  const events = await getEvents()

  return (
    <div className="container -mt-16 flex h-full flex-col gap-8 px-4 py-16">
      <h1 className="flex items-center justify-between">
        <div className="flex gap-1 text-xl font-semibold underline decoration-rose-400">
          <CalendarHeartIcon /> Events
        </div>
        <CreateEvent />
      </h1>
      <div className="flex h-full flex-col gap-4 p-2">
        <Events events={events} />
      </div>
    </div>
  )
}

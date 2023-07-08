import { CalendarHeartIcon } from "lucide-react"

import CreateEvent from "~/components/create-event"
import Events from "~/components/events"

import { getEventsAction } from "../_actions/event"

export const runtime = "edge"

export default async function Dashboard() {
  const events = await getEventsAction()

  return (
    <div className="container -mt-16 flex h-full flex-col gap-8 px-4 py-16">
      <h1 className="flex items-center gap-1 text-2xl font-semibold underline decoration-rose-400">
        <CalendarHeartIcon /> Events
      </h1>
      <div className="flex flex-col gap-4 p-2">
        <CreateEvent />
        <Events events={events} />
      </div>
    </div>
  )
}

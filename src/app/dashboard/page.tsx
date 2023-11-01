import { api } from "~/trpc/server"
import { CalendarHeartIcon } from "lucide-react"

import CreateEvent from "~/app/_components/create-event"
import Events from "~/app/_components/events"

export default async function Dashboard() {
  const events = await api.event.getAll.query()

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

import { ScrollArea } from "~/components/ui/scroll-area"
import CreateEvent from "~/components/create-event"
import EventCard from "~/components/event-card"

import { getEventsAction } from "../_actions/event"

export const runtime = "edge"

export default async function Dashboard() {
  const events = await getEventsAction()

  return (
    <div className="container -mt-16 flex h-full flex-col justify-between gap-8 px-4 py-16">
      <h1 className="decoration-slice text-2xl font-semibold underline decoration-rose-400">
        days since...
      </h1>
      <ScrollArea className="w-full flex-auto p-2">
        <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {events.map((e, i) => (
            <EventCard key={i} {...e} />
          ))}
        </div>
      </ScrollArea>
      <div className="flex w-full justify-center">
        <CreateEvent />
      </div>
    </div>
  )
}

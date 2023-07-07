import CreateEvent from "~/components/create-event"
import Events from "~/components/events"

import { getEventsAction } from "../_actions/event"

export const runtime = "edge"

export default async function Dashboard() {
  const events = await getEventsAction()

  return (
    <div className="container -mt-16 flex h-full flex-col gap-8 px-4 py-16">
      <h1 className="decoration-slice text-2xl font-semibold underline decoration-rose-400">
        days since...
      </h1>
      <div className="flex flex-col gap-4 p-2">
        <CreateEvent />
        <Events events={events} />
      </div>
    </div>
  )
}

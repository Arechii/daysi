import { api } from "~/trpc/server"

import EventList from "./event-list"

const Events = async () => {
  const events = await api.event.getAll.query()

  return <EventList events={events} />
}

export default Events

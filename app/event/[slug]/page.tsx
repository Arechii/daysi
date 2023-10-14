import { currentUser } from "@clerk/nextjs"
import { getEvent } from "app/_actions/event"
import TimelineItem from "components/timeline-item"

import TimelineCreate from "~/components/timeline-create"

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)
  const user = await currentUser()

  return (
    <div className="container">
      <div className="flex flex-col border-l-2 border-border">
        {user && <TimelineCreate user={user} />}
        {event.resets.map((r) => (
          <TimelineItem key={r.id} {...r} />
        ))}
      </div>
    </div>
  )
}

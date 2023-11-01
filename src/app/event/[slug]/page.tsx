import { currentUser } from "@clerk/nextjs"
import { api } from "~/trpc/server"

import TimelineCreate from "~/app/_components/timeline-create"
import TimelineItem from "~/app/_components/timeline-item"

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await api.event.getById.query(params.slug)
  const user = await currentUser()

  return (
    <div className="container">
      <div className="flex flex-col border-l-2 border-border">
        {user && (
          <TimelineCreate username={user.username} imageUrl={user.imageUrl} />
        )}
        {event.resets.map((r) => (
          <TimelineItem key={r.id} {...r} />
        ))}
      </div>
    </div>
  )
}

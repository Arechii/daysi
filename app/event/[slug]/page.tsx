import { getEvent } from "app/_actions/event"
import TimelineItem from "components/timeline-item"

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  return (
    <div className="container">
      <div className="flex flex-col border-l-2 border-border">
        {event.resets.map((r) => (
          <TimelineItem key={r.id} {...r} />
        ))}
      </div>
    </div>
  )
}
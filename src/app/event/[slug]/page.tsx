import TimelineItem from "~/components/timeline-item"
import { getEvent } from "~/app/_actions/event"

export const runtime = "edge"

export default async function Event({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)

  return (
    <div className="container">
      <div className="ml-[52px] flex flex-col border-l-2 border-zinc-200 p-8 dark:border-zinc-800">
        {event.resets.map((r) => (
          <TimelineItem key={r.id} {...r} />
        ))}
      </div>
    </div>
  )
}

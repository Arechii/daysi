import { Suspense } from "react"

import Timeline from "~/app/_components/timeline"
import TimelineCreate from "~/app/_components/timeline-create"

export default function Event({ params }: { params: { slug: string } }) {
  return (
    <div className="container">
      <div className="flex flex-col border-l-2 border-border">
        <Suspense>
          <TimelineCreate />
        </Suspense>
        <Suspense>
          <Timeline eventId={params.slug} />
        </Suspense>
      </div>
    </div>
  )
}

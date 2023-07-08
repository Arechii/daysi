import { db } from "~/db"
import { events } from "~/db/schema"
import { eq } from "drizzle-orm"

export const runtime = "edge"

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await db.query.events.findFirst({
    where: eq(events.id, params.slug),
  })

  return <div>{event?.description}</div>
}

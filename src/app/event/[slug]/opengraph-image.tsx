import { ImageResponse } from "next/server"
import { db } from "~/db"
import { events } from "~/db/schema"
import { eq } from "drizzle-orm"

export const runtime = "edge"
export const contentType = "image/png"

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await db.query.events.findFirst({
    where: eq(events.id, params.slug),
  })

  return new ImageResponse(
    (
      <div className="flex h-full w-full items-center justify-center text-5xl">
        {event?.description}
      </div>
    )
  )
}

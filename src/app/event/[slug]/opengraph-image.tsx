import { ImageResponse } from "next/server"
import { db } from "~/db"
import { events } from "~/db/schema"
import { eq } from "drizzle-orm"

export const runtime = "edge"
export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await db.query.events.findFirst({
    where: eq(events.id, params.slug),
  })

  return new ImageResponse(
    (
      <div tw="flex h-full w-full items-center justify-center text-5xl gap-4">
        🌺
        {event?.description}
      </div>
    ),
    {
      ...size,
      emoji: "twemoji",
    }
  )
}

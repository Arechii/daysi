/* eslint-disable @next/next/no-img-element */
import { notFound } from "next/navigation"
import { ImageResponse } from "next/server"
import { clerkClient } from "@clerk/nextjs"
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

  if (!event) {
    return notFound()
  }

  const user = await clerkClient.users.getUser(event.userId)
  const daysSince = Math.floor(
    Math.abs(event.resetAt.getTime() - new Date().getTime()) /
      (1000 * 3600 * 24)
  )

  return new ImageResponse(
    (
      <div tw="flex h-full w-full">
        <div tw="flex h-full w-full flex-col items-center justify-around rounded-xl border-2 border-rose-400 bg-white">
          <div tw="flex w-full items-center justify-center text-6xl font-extrabold tracking-wide">
            <div tw="mr-4 flex text-rose-400">{daysSince}</div>
            <div tw="flex text-zinc-700">days since</div>
          </div>
          <div tw="flex text-center text-6xl tracking-wide text-rose-400">
            {event?.description}
          </div>
          <div tw="flex items-center">
            <img
              tw="mr-4 flex h-14 w-14 rounded-full"
              src={user.profileImageUrl}
              alt={user.username ?? ""}
            />
            <span tw="flex text-4xl text-zinc-700">{user.username}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}

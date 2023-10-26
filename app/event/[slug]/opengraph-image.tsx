/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og"
import { clerkClient } from "@clerk/nextjs"
import { getEvent } from "app/_actions/event"

export const contentType = "image/png"
export const size = {
  width: 1200,
  height: 630,
}

export default async function Image({ params }: { params: { slug: string } }) {
  const event = await getEvent(params.slug)
  const user = await clerkClient.users.getUser(event.userId)

  return new ImageResponse(
    (
      <div tw="flex h-full w-full">
        <div tw="flex h-full w-full flex-col items-center justify-around rounded-xl border-2 border-primary bg-white">
          <div tw="flex w-full items-center justify-center text-6xl font-extrabold tracking-wide">
            <div tw="mr-4 flex text-primary">{event.daysSince}</div>
            <div tw="flex text-zinc-700">days since</div>
          </div>
          <div tw="flex text-center text-6xl tracking-wide text-primary">
            {event.description}
          </div>
          <div tw="flex items-center">
            <img
              tw="mr-4 flex h-14 w-14 rounded-full"
              src={user.imageUrl}
              alt={user.username ?? ""}
            />
            <span tw="flex text-4xl text-zinc-700">{user.username}</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  )
}

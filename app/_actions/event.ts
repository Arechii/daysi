"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs"
import { imageUrl } from "~/lib/utils"
import { db } from "db"
import { events, images, resets, type insertEventSchema } from "db/schema"
import { and, desc, eq, inArray } from "drizzle-orm"
import { type z } from "zod"

export type GetEvents = Awaited<ReturnType<typeof getEvents>>
export type GetEvent = Awaited<ReturnType<typeof getEvent>>

const daysSince = (date: Date) => {
  return Math.floor(
    Math.abs(date.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  )
}

export const getEvents = async () => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  const userEvents = await db.query.events.findMany({
    with: {
      resets: {
        columns: { createdAt: true },
        orderBy: desc(resets.createdAt),
        limit: 1,
      },
    },
    columns: { id: true, description: true, startedAt: true },
    where: eq(events.userId, userId),
    orderBy: desc(events.startedAt),
  })

  return userEvents.map(({ resets, ...e }) => {
    const lastReset = resets[0]?.createdAt

    return {
      ...e,
      lastReset,
      daysSince: daysSince(lastReset ?? e.startedAt),
    }
  })
}

export const getEvent = async (id: string) => {
  const userEvent = await db.query.events.findFirst({
    with: {
      resets: {
        with: { image: { columns: { id: true, type: true } } },
        orderBy: desc(resets.createdAt),
      },
    },
    where: and(eq(events.id, id)),
  })

  if (!userEvent) throw new Error("Event not found")

  const lastReset = userEvent.resets[0]?.createdAt
  const users = await clerkClient.users.getUserList({
    userId: [...new Set(userEvent.resets.map((r) => r.userId))],
  })

  return {
    ...userEvent,
    resets: userEvent.resets.map((r) => {
      const user = users.find((u) => u.id === r.userId)
      return {
        ...r,
        image: r.image && { url: imageUrl(r.image) },
        user: {
          username: user?.username,
          imageUrl: user?.imageUrl,
        },
      }
    }),
    lastReset,
    daysSince: daysSince(lastReset ?? userEvent.startedAt),
  }
}

export const createEvent = async ({
  description,
  startedAt,
}: Pick<z.infer<typeof insertEventSchema>, "description" | "startedAt">) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  await db.insert(events).values({
    userId,
    description,
    startedAt,
  })

  revalidatePath("/dashboard")
}

export const deleteEvent = async (id: string) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  const userEvent = await db.query.events.findFirst({
    with: { resets: true },
    where: and(eq(events.id, id), eq(events.userId, userId)),
  })

  if (!userEvent) throw new Error("Event not found")

  const imageIds = userEvent.resets
    .map((reset) => reset.imageId)
    .filter(Boolean)

  await db.delete(events).where(eq(events.id, id))
  await db.delete(resets).where(eq(resets.eventId, id))

  if (imageIds.length > 0)
    await db.delete(images).where(inArray(images.id, imageIds))

  revalidatePath("/dashboard")
}

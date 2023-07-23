"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { db } from "~/db"
import { events, images, resets, type insertEventSchema } from "~/db/schema"
import { createId } from "~/utils"
import { and, desc, eq, inArray } from "drizzle-orm"
import { type z } from "zod"

export type Event = Awaited<ReturnType<typeof getEvents>>[number]

export async function getEvents() {
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
      daysSince: Math.floor(
        Math.abs((lastReset ?? e.startedAt).getTime() - new Date().getTime()) /
          (1000 * 3600 * 24),
      ),
    }
  })
}

export async function createEvent({
  description,
  startedAt,
}: Pick<z.infer<typeof insertEventSchema>, "description" | "startedAt">) {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  await db.insert(events).values({
    id: createId(),
    userId,
    description,
    startedAt,
  })

  revalidatePath("/dashboard")
}

export async function deleteEvent(id: string) {
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

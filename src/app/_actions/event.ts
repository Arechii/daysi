"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { db } from "~/db"
import { events, type insertEventSchema } from "~/db/schema"
import { createId } from "~/utils"
import { and, desc, eq } from "drizzle-orm"
import { type z } from "zod"

export async function getEvents() {
  const { userId } = auth()

  if (!userId) return []

  const userEvents = await db.query.events.findMany({
    where: eq(events.userId, userId),
    orderBy: desc(events.startedAt),
  })

  return userEvents
}

export async function createEvent({
  description,
  startedAt,
}: z.infer<typeof insertEventSchema>) {
  const { userId } = auth()

  if (!userId) return

  await db.insert(events).values({
    id: createId(),
    userId,
    description,
    startedAt,
    resetAt: startedAt,
  })

  revalidatePath("/dashboard")
}

export async function resetEvent(id: string) {
  const { userId } = auth()

  if (!userId) return

  await db
    .update(events)
    .set({
      resetAt: new Date(),
    })
    .where(and(eq(events.id, id), eq(events.userId, userId)))

  revalidatePath("/dashboard")
}

export async function deleteEvent(id: string) {
  const { userId } = auth()

  if (!userId) return

  await db
    .delete(events)
    .where(and(eq(events.id, id), eq(events.userId, userId)))

  revalidatePath("/dashboard")
}

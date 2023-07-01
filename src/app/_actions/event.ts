"use server"

import { revalidatePath } from "next/cache"
import { currentUser } from "@clerk/nextjs"
import { db } from "~/db"
import { events } from "~/db/schema"
import { createId } from "~/utils"
import { desc, eq } from "drizzle-orm"

export async function getEventsAction() {
  const user = await currentUser()

  if (!user) return []

  const userEvents = await db.query.events.findMany({
    where: eq(events.userId, user.id),
    orderBy: desc(events.resetAt),
  })

  return userEvents
}

export async function createEventAction(description: string) {
  const user = await currentUser()

  if (!user) return

  await db.insert(events).values({
    id: createId(),
    userId: user.id,
    description,
  })

  revalidatePath("/dashboard")
}

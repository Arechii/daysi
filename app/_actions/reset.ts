"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { db } from "db"
import { events, resets, type insertResetSchema } from "db/schema"
import { and, eq } from "drizzle-orm"
import { createId } from "utils"
import { type z } from "zod"

export const createReset = async ({
  eventId,
  note,
  imageId,
}: Omit<z.infer<typeof insertResetSchema>, "id" | "userId">) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  const event = await db.query.events.findFirst({
    where: and(eq(events.id, eventId), eq(events.userId, userId)),
  })

  if (!event) throw new Error("Event not found")

  const id = createId()

  await db.insert(resets).values({
    id,
    eventId,
    userId,
    note,
    imageId,
  })

  revalidatePath("/dashboard")
  revalidatePath("/event/[slug]")
  return id
}

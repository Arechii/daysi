"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { db } from "~/db"
import { events, resets, type insertResetSchema } from "~/db/schema"
import { createId } from "~/utils"
import { and, eq } from "drizzle-orm"
import { type z } from "zod"

export async function createReset({
  eventId,
}: Omit<z.infer<typeof insertResetSchema>, "id">) {
  const { userId } = auth()

  if (!userId) return

  const event = await db.query.events.findFirst({
    where: and(eq(events.id, eventId), eq(events.userId, userId)),
  })

  if (!event) return

  await db.insert(resets).values({
    id: createId(),
    eventId,
  })

  revalidatePath("/dashboard")
}

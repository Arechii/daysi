"use server"

import { revalidatePath } from "next/cache"
import { auth } from "@clerk/nextjs"
import { type Reset } from "@prisma/client"
import { db } from "~/lib/db"
import { createId } from "~/lib/utils"

export const createReset = async ({
  eventId,
  note,
  imageId,
}: Pick<Reset, "eventId" | "note" | "imageId">) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  const event = await db.event.findFirst({
    where: {
      id: eventId,
      userId,
    },
  })

  if (!event) throw new Error("Event not found")

  const id = createId()

  await db.reset.create({
    data: {
      id,
      eventId,
      userId,
      note,
      imageId,
    },
  })

  revalidatePath("/dashboard")
  revalidatePath("/event/[slug]")
  return id
}

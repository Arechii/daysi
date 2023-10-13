"use server"

import { revalidatePath } from "next/cache"
import { auth, clerkClient } from "@clerk/nextjs"
import { type Event } from "@prisma/client"
import { db } from "~/lib/db"
import { imageUrl } from "~/lib/utils"

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

  const userEvents = await db.event.findMany({
    where: { userId },
    orderBy: { startedAt: "desc" },
    select: {
      id: true,
      description: true,
      startedAt: true,
      resets: {
        select: { createdAt: true },
        orderBy: { createdAt: "desc" },
        take: 1,
      },
    },
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
  const userEvent = await db.event.findFirst({
    where: { id },
    select: {
      id: true,
      description: true,
      startedAt: true,
      createdAt: true,
      updatedAt: true,
      userId: true,
      resets: {
        orderBy: { createdAt: "desc" },
        include: { image: { select: { id: true, type: true } } },
      },
    },
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
}: Pick<Event, "description" | "startedAt">) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  await db.event.create({
    data: {
      userId,
      description,
      startedAt,
    },
  })

  revalidatePath("/dashboard")
}

export const deleteEvent = async (id: string) => {
  const { userId } = auth()

  if (!userId) throw new Error("Unauthorized")

  const userEvent = await db.event.findFirst({
    where: { userId, id },
  })

  if (!userEvent) throw new Error("Event not found")

  await db.event.delete({ where: { id } })

  revalidatePath("/dashboard")
}

import { clerkClient } from "@clerk/nextjs"
import { type inferRouterOutputs } from "@trpc/server"
import { createId, imageUrl } from "~/lib/utils"
import { z } from "zod"

import { type AppRouter } from "../root"
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc"

export type GetEvents = inferRouterOutputs<AppRouter>["event"]["getAll"]
export type GetEvent = inferRouterOutputs<AppRouter>["event"]["getById"]

const daysSince = (date: Date) => {
  return Math.floor(
    Math.abs(date.getTime() - new Date().getTime()) / (1000 * 3600 * 24),
  )
}

export const eventRouter = createTRPCRouter({
  getById: publicProcedure
    .input(z.string().length(10))
    .query(async ({ ctx: { db }, input: id }) => {
      const userEvent = await db.event.findUniqueOrThrow({
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
    }),

  getAll: protectedProcedure.query(
    async ({
      ctx: {
        db,
        auth: { userId },
      },
    }) => {
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
    },
  ),

  create: protectedProcedure
    .input(
      z.object({
        description: z.string().min(3).max(128),
        startedAt: z.date(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          db,
          auth: { userId },
        },
        input: { description, startedAt },
      }) => {
        await db.event.create({
          data: {
            id: createId(),
            userId,
            description,
            startedAt,
          },
        })
      },
    ),

  remove: protectedProcedure.input(z.string().length(10)).mutation(
    async ({
      ctx: {
        db,
        auth: { userId },
      },
      input: id,
    }) => {
      await db.event.findFirstOrThrow({
        where: { userId, id },
      })

      await db.event.delete({ where: { id } })
    },
  ),
})

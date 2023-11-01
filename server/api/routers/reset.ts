import { createId } from "~/lib/utils"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const resetRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        eventId: z.string().length(10),
        note: z.string().nullable(),
        imageId: z.string().length(10).nullable(),
      }),
    )
    .mutation(
      async ({
        ctx: {
          db,
          auth: { userId },
        },
        input: { eventId, note, imageId },
      }) => {
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

        return id
      },
    ),
})

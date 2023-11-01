import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { createId } from "~/lib/utils"
import { z } from "zod"

import { createTRPCRouter, protectedProcedure } from "../trpc"

export const imageRouter = createTRPCRouter({
  createSignedUrl: protectedProcedure
    .input(
      z.object({
        type: z.string(),
        size: z.number(),
      }),
    )
    .mutation(async ({ ctx: { db, r2 }, input: { type, size } }) => {
      if (size > 1024 * 1024 * 16) throw new Error("File too large")

      const extension = type.split("/")[1]

      if (!extension) throw new Error("Invalid file type")

      const id = createId()
      const signedUrl = await getSignedUrl(
        r2,
        new PutObjectCommand({
          Bucket: "daysi",
          Key: `${id}.${extension}`,
          ContentType: type,
        }),
        {
          expiresIn: 60 * 10,
        },
      )

      await db.image.create({ data: { id, type, size } })

      return { signedUrl, id }
    }),
})

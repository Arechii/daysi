import { currentUser } from "@clerk/nextjs"
import { db } from "~/db"
import { images, resets } from "~/db/schema"
import { createId } from "~/utils"
import { and, eq } from "drizzle-orm"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { z } from "zod"

const f = createUploadthing()

export const uploadRouter = {
  resetImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .input(z.object({ resetId: z.string() }))
    .middleware(async ({ input: { resetId } }) => {
      const user = await currentUser()

      if (!user) throw new Error("Unauthorized")

      const reset = await db.query.resets.findFirst({
        where: and(eq(resets.id, resetId), eq(resets.userId, user.id)),
      })

      if (!reset) throw new Error("Reset not found")

      return { resetId }
    })
    .onUploadComplete(async ({ file, metadata }) => {
      console.log(file, metadata)

      const id = createId()

      await db.insert(images).values({
        id,
        ...file,
      })
      await db
        .update(resets)
        .set({
          imageId: id,
        })
        .where(eq(resets.id, metadata.resetId))
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter

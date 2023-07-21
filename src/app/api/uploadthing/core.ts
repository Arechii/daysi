import { currentUser } from "@clerk/nextjs"
import { db } from "~/db"
import { resets } from "~/db/schema"
import { eq } from "drizzle-orm"
import { createUploadthing, type FileRouter } from "uploadthing/next"
import { z } from "zod"

const f = createUploadthing()

export const uploadRouter = {
  resetImage: f({ image: { maxFileSize: "16MB", maxFileCount: 1 } })
    .input(z.string().cuid2())
    .middleware(async ({ input: resetId }) => {
      const user = await currentUser()

      if (!user) throw new Error("Unauthorized")

      const reset = await db.query.resets.findFirst({
        where: eq(resets.id, resetId),
      })

      if (!reset) throw new Error("Reset not found")

      return { userId: user.id, resetId }
    })
    .onUploadComplete(({ file, metadata }) => {
      console.log(file, metadata)
    }),
} satisfies FileRouter

export type UploadRouter = typeof uploadRouter

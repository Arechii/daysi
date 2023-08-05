"use server"

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { currentUser } from "@clerk/nextjs"
import { db } from "~/db"
import { images } from "~/db/schema"
import { env } from "~/env.mjs"
import { createId } from "~/utils"

const r2 = new S3Client({
  region: "auto",
  endpoint: `https://${env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: env.R2_KEY,
    secretAccessKey: env.R2_SECRET,
  },
})

export const createSignedUrl = async ({
  type,
  size,
}: Pick<File, "type" | "size">) => {
  if (size > 1024 * 1024 * 16) throw new Error("File too large")

  const user = await currentUser()

  if (!user) throw new Error("Unauthorized")

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

  await db.insert(images).values({ id, type, size })

  return { signedUrl, id }
}
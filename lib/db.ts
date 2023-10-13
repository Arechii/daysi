import { connect } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { env } from "~/env.mjs"

const globalForPrisma = globalThis as unknown as {
  db: PrismaClient | undefined
}

export const db =
  globalForPrisma.db ??
  new PrismaClient({
    adapter: new PrismaPlanetScale(connect({ url: env.DATABASE_URL })),
    log:
      process.env.NODE_ENV === "development"
        ? ["query", "error", "warn"]
        : ["error"],
  })

if (process.env.NODE_ENV !== "production") globalForPrisma.db = db

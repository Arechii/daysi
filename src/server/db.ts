import { Client } from "@planetscale/database"
import { PrismaPlanetScale } from "@prisma/adapter-planetscale"
import { PrismaClient } from "@prisma/client"
import { env } from "~/env"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: new PrismaPlanetScale(new Client({ url: env.DATABASE_URL })),
    log:
      env.NODE_ENV === "development" ? ["query", "error", "warn"] : ["error"],
  })

if (env.NODE_ENV !== "production") globalForPrisma.prisma = db

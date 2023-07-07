import { type InferModel } from "drizzle-orm"
import {
  index,
  mysqlTableCreator,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

const mysqlTable = mysqlTableCreator((name) => `daysi_${name}`)

export const events = mysqlTable(
  "events",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    userId: varchar("userId", { length: 32 }).notNull(),
    description: varchar("description", { length: 128 }).notNull(),
    resetAt: timestamp("resetAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (events) => ({
    userIdIndex: index("userid_idx").on(events.userId),
  })
)

export type Event = InferModel<typeof events>

export const selectEventSchema = createSelectSchema(events)
export const insertEventSchema = createInsertSchema(events)

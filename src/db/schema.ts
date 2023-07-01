// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferModel } from "drizzle-orm"
import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"

export const events = mysqlTable(
  "events",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    userId: varchar("userId", { length: 32 }).notNull(),
    description: varchar("description", { length: 64 }).notNull(),
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

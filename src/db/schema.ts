import { relations, type InferModel } from "drizzle-orm"
import {
  index,
  mysqlTableCreator,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core"
import { createInsertSchema, createSelectSchema } from "drizzle-zod"
import { z } from "zod"

const mysqlTable = mysqlTableCreator((name) => `daysi_${name}`)

export const events = mysqlTable(
  "events",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    userId: varchar("userId", { length: 32 }).notNull(),
    description: varchar("description", { length: 128 }).notNull(),
    startedAt: timestamp("startedAt").defaultNow().notNull(),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (events) => ({
    userIdIndex: index("userid_idx").on(events.userId),
  }),
)

export const resets = mysqlTable(
  "resets",
  {
    id: varchar("id", { length: 10 }).primaryKey(),
    eventId: varchar("eventId", { length: 10 }).notNull(),
    userId: varchar("userId", { length: 32 }).notNull(),
    note: text("note"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (resets) => ({
    eventIdIndex: index("eventid_idx").on(resets.eventId),
    userIdIndex: index("userid_idx").on(resets.userId),
  }),
)

export const eventsRelations = relations(events, ({ many }) => ({
  resets: many(resets),
}))

export const resetsRelations = relations(resets, ({ one }) => ({
  event: one(events, { fields: [resets.eventId], references: [events.id] }),
}))

export type Event = InferModel<typeof events> & {
  resets: Omit<Reset, "event">[]
}
export type Reset = InferModel<typeof resets> & { event: Omit<Event, "resets"> }

export const selectEventSchema = createSelectSchema(events)
export const insertEventSchema = createInsertSchema(events, {
  description: (schema) => schema.description.min(3),
  startedAt: z.date(),
})

export const selectResetSchema = createSelectSchema(resets)
export const insertResetSchema = createInsertSchema(resets)

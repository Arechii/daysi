import { createId } from "~/lib/utils"
import { relations, type InferSelectModel } from "drizzle-orm"
import {
  index,
  int,
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
    id: varchar("id", { length: 10 })
      .primaryKey()
      .$default(() => createId()),
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
    id: varchar("id", { length: 10 })
      .primaryKey()
      .$default(() => createId()),
    eventId: varchar("eventId", { length: 10 }).notNull(),
    userId: varchar("userId", { length: 32 }).notNull(),
    imageId: varchar("imageId", { length: 36 }),
    note: text("note"),
    createdAt: timestamp("createdAt").defaultNow(),
    updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
  },
  (resets) => ({
    eventIdIndex: index("eventid_idx").on(resets.eventId),
    userIdIndex: index("userid_idx").on(resets.userId),
  }),
)

export const images = mysqlTable("images", {
  id: varchar("id", { length: 10 })
    .primaryKey()
    .$default(() => createId()),
  type: varchar("type", { length: 15 }).notNull(),
  size: int("size").notNull(),
  createdAt: timestamp("createdAt").defaultNow(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow(),
})

export const eventsRelations = relations(events, ({ many }) => ({
  resets: many(resets),
}))

export const resetsRelations = relations(resets, ({ one }) => ({
  event: one(events, { fields: [resets.eventId], references: [events.id] }),
  image: one(images, { fields: [resets.imageId], references: [images.id] }),
}))

export type Event = InferSelectModel<typeof events>
export type Reset = InferSelectModel<typeof resets>
export type Image = InferSelectModel<typeof images>

export const selectEventSchema = createSelectSchema(events)
export const insertEventSchema = createInsertSchema(events, {
  description: (schema) => schema.description.min(3),
  startedAt: z.date(),
})

export const selectResetSchema = createSelectSchema(resets)
export const insertResetSchema = createInsertSchema(resets)

export const selectImageSchema = createSelectSchema(images)
export const insertImageSchema = createInsertSchema(images)

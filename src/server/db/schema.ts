// Example model schema from the Drizzle docs
// https://orm.drizzle.team/docs/sql-schema-declaration

import { type InferModel } from "drizzle-orm";
import { mysqlTable, varchar } from "drizzle-orm/mysql-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const posts = mysqlTable("posts", {
  id: varchar("id", { length: 10 }).primaryKey(),
  text: varchar("text", { length: 255 }),
});

export type Post = InferModel<typeof posts>;

export const selectPostSchema = createSelectSchema(posts);
export const insertPostSchema = createInsertSchema(posts).pick({ text: true });

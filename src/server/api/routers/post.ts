import { eq } from "drizzle-orm";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { insertPostSchema, posts, selectPostSchema } from "~/server/db/schema";
import { createId } from "~/utils/id";

export const hello = publicProcedure
  .output(selectPostSchema.nullable())
  .query(async ({ ctx: { db } }) => {
    return db
      .select()
      .from(posts)
      .limit(1)
      .then((r) => r[0] ?? null);
  });

export const create = publicProcedure
  .input(insertPostSchema)
  .output(selectPostSchema)
  .mutation(async ({ ctx: { db }, input: { text } }) => {
    const id = createId();
    await db.insert(posts).values({ id, text });

    const post = await db
      .select()
      .from(posts)
      .where(eq(posts.id, id))
      .then((r) => r[0]);

    if (!post) throw new Error("Failed to create post");

    return post;
  });

export const postRouter = createTRPCRouter({
  hello,
  create,
});

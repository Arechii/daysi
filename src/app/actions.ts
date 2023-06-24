"use server";

import * as posts from "~/server/api/routers/post";
import { createAction } from "~/server/api/trpc";

/** You can also create procedures inline using the reusable procedure builders. */
export const createPost = createAction(posts.create);

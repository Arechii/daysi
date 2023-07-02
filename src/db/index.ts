import { connect } from "@planetscale/database"
import { env } from "~/env.mjs"
import { drizzle } from "drizzle-orm/planetscale-serverless"

import * as schema from "./schema"

// create the connection
const connection = connect({
  url: env.DATABASE_URL,
})

export const db = drizzle(connection, {
  schema,
  logger: env.NODE_ENV !== "production",
})

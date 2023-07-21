import { createNextRouteHandler } from "uploadthing/next"

import { uploadRouter } from "./core"

export const runtime = "edge"

export const { GET, POST } = createNextRouteHandler({
  router: uploadRouter,
})

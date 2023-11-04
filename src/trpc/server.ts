import { cookies } from "next/headers"
import { auth } from "@clerk/nextjs"
import {
  createTRPCProxyClient,
  loggerLink,
  unstable_httpBatchStreamLink,
} from "@trpc/client"
import { type AppRouter } from "~/server/api/root"

import { getUrl, transformer } from "./shared"

export const api = createTRPCProxyClient<AppRouter>({
  transformer,
  links: [
    loggerLink({
      enabled: (op) =>
        process.env.NODE_ENV === "development" ||
        (op.direction === "down" && op.result instanceof Error),
    }),
    unstable_httpBatchStreamLink({
      url: getUrl(),
      async headers() {
        return {
          cookie: cookies().toString(),
          "x-trpc-source": "rsc",
          Authorization: `Bearer ${await auth().getToken()}`,
        }
      },
    }),
  ],
})

import { NextResponse } from "next/server"
import { authMiddleware } from "@clerk/nextjs"

export default authMiddleware({
  publicRoutes: ["/"],
  afterAuth(auth) {
    if (auth.isPublicRoute) {
      return NextResponse.next()
    }
  },
})

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
}

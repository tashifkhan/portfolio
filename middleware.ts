import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/utils/jwt-edge"

export async function middleware(request: NextRequest) {
   const isUpdateRoute = request.nextUrl.pathname.startsWith("/update")
   
   if (!isUpdateRoute) {
      return NextResponse.next()
   }

   const token = request.cookies.get("auth_token")

   if (!token) {
      return NextResponse.redirect(new URL("/", request.url))
   }

   const payload = await verifyToken(token.value)
   if (!payload) {
      return NextResponse.redirect(new URL("/", request.url))
   }

   return NextResponse.next()
}

export const config = {
   matcher: "/update/:path*"
}

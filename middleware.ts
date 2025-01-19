import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { verifyToken } from "@/utils/auth"

export async function middleware(request: NextRequest) {
   const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
   const isLoginRoute = request.nextUrl.pathname === "/admin/login"

   if (!isAdminRoute) {
      return NextResponse.next()
   }

   const token = request.cookies.get("auth_token")

   if (!token && !isLoginRoute) {
      return NextResponse.redirect(new URL("/admin/login", request.url))
   }

   if (token && isLoginRoute) {
      return NextResponse.redirect(new URL("/admin/dashboard", request.url))
   }

   if (token && !isLoginRoute) {
      const isValid = await verifyToken(token.value)
      if (!isValid) {
         return NextResponse.redirect(new URL("/admin/login", request.url))
      }
   }

   return NextResponse.next()
}

export const config = {
   matcher: "/admin/:path*"
}

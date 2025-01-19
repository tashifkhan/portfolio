import { NextResponse } from "next/server"
import { cookies } from "next/headers"
import { authenticateUser } from "@/utils/auth"

export async function POST(req: Request) {
   try {
      const { email, password } = await req.json()

      const token = await authenticateUser(email, password)
      
      if (!token) {
         return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
         )
      }

      (await cookies()).set({
         name: "auth_token",
         value: token,
         httpOnly: true,
         secure: process.env.NODE_ENV === "production",
         sameSite: "strict",
         maxAge: 60 * 60 * 24 * 30 // 30 days
      })

      return NextResponse.json({ success: true })
   } catch (error) {
      return NextResponse.json(
         { error: "Authentication failed" },
         { status: 500 }
      )
   }
}

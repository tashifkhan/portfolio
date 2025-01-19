import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"

export async function POST(req: Request) {
   try {
      const { email, password } = await req.json()

      // Validate credentials (replace with your actual validation)
      const isValidEmail = email === process.env.ADMIN_EMAL
      const isValidPassword = password === process.env.ADMIN_PASSWORD

      if (!isValidEmail || !isValidPassword) {
         return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
         )
      }

      const secret = process.env.JWT_SECRET
      if (!secret) {
         throw new Error("JWT_SECRET is not defined")
      }

      // Generate JWT token
      const token = sign(
         { email, role: "admin" },
         secret,
         { expiresIn: "24h" }
      )

      return NextResponse.json({ token })
   } catch (error: any) {
      return NextResponse.json(
         { error: "Authentication failed" },
         { status: 500 }
      )
   }
}

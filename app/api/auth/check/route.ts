import { NextResponse } from "next/server"
import { isAuthenticated } from "@/utils/auth"

export async function GET() {
   const isAuthed = await isAuthenticated()
   
   if (!isAuthed) {
      return NextResponse.json({ authenticated: false })
   }

   return NextResponse.json({ authenticated: true })
}

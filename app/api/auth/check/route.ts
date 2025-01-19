import { NextResponse } from "next/server"
import { isAuthenticated } from "@/utils/auth"

export async function GET() {
   const isAuthed = await isAuthenticated()
   
   if (!isAuthed) {
      return new NextResponse(null, { status: 401 })
   }

   return NextResponse.json({ authenticated: true })
}

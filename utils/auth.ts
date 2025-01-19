import { headers } from "next/headers"
import { verify } from "jsonwebtoken"

export async function isAuthenticated() {
   try {
      const headersList = await headers()
      const token = headersList.get("Authorization")?.replace("Bearer ", "")

      if (!token) {
         return false
      }

      const secret = process.env.JWT_SECRET
      if (!secret) {
         throw new Error("JWT_SECRET is not defined")
      }

      const verified = verify(token, secret)
      return !!verified
   } catch (error) {
      return false
   }
}

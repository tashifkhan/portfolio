import jwt from "jsonwebtoken"
import { cookies } from "next/headers"

const JWT_SECRET = process.env.JWT_SECRET || ""
const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

export async function authenticateUser(email: string, password: string) {
   if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "30d" })
      return token
   }
   return null
}

export async function isAuthenticated() {
   const cookieStore = cookies()
   const token = (await cookieStore).get("auth_token")

   if (!token) return false

   try {
      jwt.verify(token.value, JWT_SECRET)
      return true
   } catch (error) {
      return false
   }
}

export async function verifyToken(token: string) {
   try {
      return jwt.verify(token, JWT_SECRET)
   } catch (error) {
      return null
   }
}

export async function logout() {
   const cookieStore = cookies()
   ;(await cookieStore).delete("auth_token")
}

export async function checkAuth() {
   return await isAuthenticated()
}


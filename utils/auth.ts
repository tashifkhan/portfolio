import { cookies } from "next/headers"
import { createAuthToken, verifyToken as verifyJWT } from "./jwt-edge"

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL
const ADMIN_PASSWORD = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

export async function authenticateUser(email: string, password: string) {
   if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
      const token = await createAuthToken(email)
      return token
   }
   return null
}

export async function isAuthenticated() {
   const cookieStore = cookies()
   const token = (await cookieStore).get("auth_token")

   if (!token) return false

   try {
      const payload = await verifyJWT(token.value)
      return !!payload
   } catch (error) {
      return false
   }
}

export async function verifyToken(token: string) {
   try {
      return await verifyJWT(token)
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

export async function getTokenPayload() {
   const cookieStore = cookies()
   const token = (await cookieStore).get("auth_token")
   
   if (!token) return null
   
   try {
      return await verifyToken(token.value)
   } catch (error) {
      return null
   }
}


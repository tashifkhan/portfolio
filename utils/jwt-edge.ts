import { SignJWT, jwtVerify } from 'jose'

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || 'default-secret')

export async function signToken(payload: any, expiresIn: string = '30d') {
  return await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(expiresIn)
    .sign(JWT_SECRET)
}

export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, JWT_SECRET)
    return payload
  } catch (error) {
    return null
  }
}

export async function createAuthToken(email: string) {
  return await signToken({ email }, '30d')
}
import { create } from "zustand"

interface AuthState {
   isAuthenticated: boolean
   login: (email: string, password: string) => boolean
   logout: () => void
}

export const useAuth = create<AuthState>((set) => ({
   isAuthenticated: false,
   login: (email: string, password: string) => {
    
      const adminEmail = process.env.NEXT_PUBLIC_ADMIN_EMAIL
      const adminPassword = process.env.NEXT_PUBLIC_ADMIN_PASSWORD

      if (!adminEmail || !adminPassword) {
         console.error("Environment variables not properly loaded")
         return false
      }

      const isValid = email === adminEmail && password === adminPassword
      set({ isAuthenticated: isValid })
      return isValid
   },
   logout: () => set({ isAuthenticated: false })
}))

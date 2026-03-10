"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react"
import type { User } from "./types"

interface AuthContextType {
  user: User | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  // const [user, setUser] = useState<User | null>(null)
  const [user, setUser] = useState<User | null>({
    id: "demo",
    name: "Demo User",
    email: "demo@noteai.com",
    avatar: "",
    createdAt: new Date().toISOString(),
  })
  const [isLoading, setIsLoading] = useState(false)

  // const login = useCallback(async (email: string, password: string) => {
  //   setIsLoading(true)

  //   try {
  //     const res = await fetch("/api/auth/login", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ email, password }),
  //     })

  //     const data = await res.json()

  //     if (!res.ok) {
  //       throw new Error(data.error || "Login failed")
  //     }

  //     localStorage.setItem("token", data.token)
  //     setUser(data.user)
  //   } finally {
  //     setIsLoading(false)
  //   }
  // }, [])

  const login = useCallback(async () => {
    setUser({
      id: "demo",
      name: "Demo User",
      email: "demo@noteai.com",
      avatar: "",
      createdAt: new Date().toISOString(),
    })
  }, [])

  const signup = useCallback(
    async (name: string, email: string, password: string) => {
      setIsLoading(true)

      try {
        const res = await fetch("/api/auth/signup", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email, password }),
        })

        const data = await res.json()

        if (!res.ok) {
          throw new Error(data.error || "Signup failed")
        }

        setUser(data.user)
      } finally {
        setIsLoading(false)
      }
    },
    []
  )

  // const logout = useCallback(() => {
  //   localStorage.removeItem("token")
  //   setUser(null)
  // }, [])
  const logout = useCallback(() => {
    // disabled for demo
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        signup,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

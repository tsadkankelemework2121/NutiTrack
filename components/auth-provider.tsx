"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter, usePathname } from "next/navigation"

type User = {
  id: string
  name: string
  email: string
  profile?: UserProfile
  meals?: any[]
  waterConsumed?: number
  healthStatus?: string
}

type UserProfile = {
  age: number
  sex: "male" | "female"
  height: number // in cm
  weight: number // in kg
  activityLevel: "sedentary" | "light" | "moderate" | "active" | "very_active"
  goal: "lose" | "maintain" | "gain"
  mealPreferences: string[]
  dailyCalorieTarget: number
}

type AuthContextType = {
  user: User | null
  isLoading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string) => Promise<void>
  logout: () => void
  updateProfile: (profile: UserProfile) => void
  updateMealData: (meals: any[]) => void
  updateWaterData: (water: number) => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isMounted, setIsMounted] = useState(false)
  const router = useRouter()
  const pathname = usePathname()

  // Ensure we're on the client before accessing localStorage
  useEffect(() => {
    setIsMounted(true)
  }, [])

  // Load registered users from localStorage on initial load (only on client)
  // This only loads users who registered, not those who just logged in
  useEffect(() => {
    if (!isMounted) return
    
    // Only load from localStorage if user registered (has localStorage data)
    // Login users are not persisted, so they won't be loaded here
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("nutritrack-user")
      if (storedUser) {
        try {
          const parsedUser = JSON.parse(storedUser)
          // Only restore if this is a registered user (has localStorage data)
          // Login sessions are not persisted, so they won't be in localStorage
          // Ensure healthStatus is included if it exists
          setUser(parsedUser)
        } catch (error) {
          console.error("Error parsing stored user:", error)
          localStorage.removeItem("nutritrack-user")
        }
      }
    }
    setIsLoading(false)
  }, [isMounted])

  // Protect routes
  useEffect(() => {
    if (!isLoading && isMounted) {
      // If user is not logged in and trying to access protected routes
      if (
        !user &&
        (pathname.startsWith("/dashboard") ||
          pathname.startsWith("/meals") ||
          pathname.startsWith("/water") ||
          pathname.startsWith("/profile") ||
          pathname.startsWith("/recipes"))
      ) {
        router.push("/auth/login")
      }

      // Only redirect from auth pages if user is already logged in AND has completed profile
      // This prevents redirecting during registration flow (step 2)
      if (user && pathname.startsWith("/auth") && user.profile) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, isMounted, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data - no localStorage, memory only
    const mockUser: User = {
      id: "user-1",
      name: "John Doe",
      email: email,
    }

    setUser(mockUser)
    // No localStorage for login - user will be logged out on refresh
    setIsLoading(false)
    router.push("/dashboard")
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data - use a counter-based ID to avoid Date.now() hydration issues
    // In a real app, this would come from the server
    const timestamp = typeof window !== "undefined" ? Date.now() : Math.floor(Math.random() * 1000000)
    const mockUser: User = {
      id: "user-" + timestamp,
      name: name,
      email: email,
    }

    setUser(mockUser)
    if (typeof window !== "undefined") {
      localStorage.setItem("nutritrack-user", JSON.stringify(mockUser))
    }
    setIsLoading(false)
    // Don't redirect here - let the registration page handle the flow
  }

  const logout = () => {
    setUser(null)
    // Clear localStorage only if it exists (for registered users)
    if (typeof window !== "undefined") {
      localStorage.removeItem("nutritrack-user")
    }
    router.push("/")
  }

  const updateProfile = (profile: UserProfile) => {
    if (user) {
      // Preserve healthStatus if it exists
      const updatedUser = { ...user, profile }
      setUser(updatedUser)
      if (typeof window !== "undefined") {
        localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
      }
      // Don't redirect if we're already on the profile page
      if (!pathname.startsWith("/profile")) {
        router.push("/dashboard")
      }
    }
  }

  const updateMealData = (meals: any[]) => {
    if (user) {
      // Use functional update to avoid stale closures
      setUser((prevUser) => {
        if (!prevUser) return null
        const updatedUser = {
          ...prevUser,
          meals: meals,
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
        }
        return updatedUser
      })
    }
  }

  const updateWaterData = (water: number) => {
    if (user) {
      // Use functional update to avoid stale closures
      setUser((prevUser) => {
        if (!prevUser) return null
        const updatedUser = {
          ...prevUser,
          waterConsumed: water,
        }
        if (typeof window !== "undefined") {
          localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
        }
        return updatedUser
      })
    }
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        register,
        logout,
        updateProfile,
        updateMealData,
        updateWaterData,
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

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
  const router = useRouter()
  const pathname = usePathname()

  // Simulate loading user from localStorage on initial load
  useEffect(() => {
    const storedUser = localStorage.getItem("nutritrack-user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setIsLoading(false)
  }, [])

  // Protect routes
  useEffect(() => {
    if (!isLoading) {
      // If user is not logged in and trying to access protected routes
      if (
        !user &&
        (pathname.startsWith("/dashboard") ||
          pathname.startsWith("/profile") ||
          pathname.startsWith("/meals") ||
          pathname.startsWith("/water"))
      ) {
        router.push("/auth/login")
      }

      // If user is logged in but doesn't have a profile
      if (user && !user.profile && pathname !== "/profile" && !pathname.startsWith("/auth")) {
        router.push("/profile")
      }

      // If user is logged in and has a profile but is on auth pages
      if (user && pathname.startsWith("/auth")) {
        router.push("/dashboard")
      }
    }
  }, [user, isLoading, pathname, router])

  const login = async (email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "user-1",
      name: "John Doe",
      email: email,
    }

    setUser(mockUser)
    localStorage.setItem("nutritrack-user", JSON.stringify(mockUser))
    setIsLoading(false)
    router.push(mockUser.profile ? "/dashboard" : "/profile")
  }

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Mock user data
    const mockUser: User = {
      id: "user-" + Date.now(),
      name: name,
      email: email,
    }

    setUser(mockUser)
    localStorage.setItem("nutritrack-user", JSON.stringify(mockUser))
    setIsLoading(false)
    router.push("/profile")
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("nutritrack-user")
    router.push("/")
  }

  const updateProfile = (profile: UserProfile) => {
    if (user) {
      const updatedUser = { ...user, profile }
      setUser(updatedUser)
      localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
      router.push("/dashboard")
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
        localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
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
        localStorage.setItem("nutritrack-user", JSON.stringify(updatedUser))
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

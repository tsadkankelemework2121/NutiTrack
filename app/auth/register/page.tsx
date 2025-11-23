"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock, Mail, User, Activity, Heart, Ruler, Weight } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"

export default function RegisterPage() {
  const [step, setStep] = useState<1 | 2>(1)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  
  // Second form fields
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [exerciseHabits, setExerciseHabits] = useState<string>("")
  const [healthStatus, setHealthStatus] = useState("")
  
  const { register, updateProfile, isLoading } = useAuth()
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast({
        variant: "destructive",
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
      })
      return
    }

    try {
      await register(name, email, password)
      toast({
        title: "Registration successful",
        description: "Now let's set up your profile.",
      })
      setStep(2)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Registration failed",
        description: "There was an error creating your account. Please try again.",
      })
    }
  }

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!age || !weight || !height || !exerciseHabits) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      })
      return
    }

    try {
      // Calculate daily calorie target (simplified calculation)
      const weightNum = parseFloat(weight)
      const heightNum = parseFloat(height)
      const ageNum = parseInt(age)
      
      // BMR calculation (simplified)
      const bmr = 10 * weightNum + 6.25 * heightNum - 5 * ageNum + 5
      const activityMultipliers: Record<string, number> = {
        sedentary: 1.2,
        light: 1.375,
        moderate: 1.55,
        active: 1.725,
        very_active: 1.9,
      }
      const dailyCalorieTarget = Math.round(bmr * (activityMultipliers[exerciseHabits] || 1.2))

      const profile = {
        age: ageNum,
        sex: "male" as const, // Default, can be updated later
        height: heightNum,
        weight: weightNum,
        activityLevel: exerciseHabits as "sedentary" | "light" | "moderate" | "active" | "very_active",
        goal: "maintain" as const, // Default, can be updated later
        mealPreferences: [],
        dailyCalorieTarget,
      }

      updateProfile(profile)
      
      // Store health status separately (not in UserProfile type, but we'll store it)
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("nutritrack-user")
        if (userData) {
          const user = JSON.parse(userData)
          user.healthStatus = healthStatus
          localStorage.setItem("nutritrack-user", JSON.stringify(user))
        }
      }

      toast({
        title: "Profile completed!",
        description: "Welcome to NutriTrack!",
      })
      
      router.push("/dashboard")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error saving your profile. Please try again.",
      })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12 bg-gradient-to-br from-secondary via-white to-white relative">
      <div className="absolute inset-0 bg-pattern opacity-5 z-0"></div>
      <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full blur-3xl z-0"></div>
      <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-br from-green-600/20 to-green-500/20 rounded-full blur-3xl z-0"></div>

      <div className="w-full max-w-md z-10">
        <div className="flex justify-center mb-8">
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              NT
            </div>
            <span className="font-bold text-2xl">NutriTrack</span>
          </Link>
        </div>

        {step === 1 ? (
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="space-y-1 pt-6">
              <CardTitle className="text-2xl font-bold text-center">Create an account</CardTitle>
              <CardDescription className="text-center">
                Enter your information to get started with NutriTrack
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium">
                    Full Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="name"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium">
                    Email
                  </Label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password" className="font-medium">
                    Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      className="h-12 pl-10 pr-10"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="confirm-password" className="font-medium">
                    Confirm Password
                  </Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="confirm-password"
                      type={showPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-md"
                  disabled={isLoading}
                >
                  {isLoading ? "Creating account..." : "Sign up"}
                </Button>
                <div className="text-center text-sm">
                  Already have an account?{" "}
                  <Link href="/auth/login" className="text-primary hover:underline font-medium">
                    Log in
                  </Link>
                </div>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <Card className="border-none shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="space-y-1 pt-6">
              <CardTitle className="text-2xl font-bold text-center">Complete Your Profile</CardTitle>
              <CardDescription className="text-center">
                Help us personalize your experience
              </CardDescription>
            </CardHeader>
            <form onSubmit={handleProfileSubmit}>
              <CardContent className="space-y-4 pt-4">
                <div className="space-y-2">
                  <Label htmlFor="age" className="font-medium">
                    Age
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="age"
                      type="number"
                      placeholder="25"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                      required
                      min="1"
                      max="120"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="weight" className="font-medium">
                    Weight (kg)
                  </Label>
                  <div className="relative">
                    <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="weight"
                      type="number"
                      placeholder="70"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      required
                      min="1"
                      step="0.1"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height" className="font-medium">
                    Height (cm)
                  </Label>
                  <div className="relative">
                    <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="height"
                      type="number"
                      placeholder="175"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      required
                      min="1"
                      step="0.1"
                      className="h-12 pl-10"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="exercise" className="font-medium">
                    Exercise Habits
                  </Label>
                  <div className="relative">
                    <Activity className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground z-10" />
                    <Select value={exerciseHabits} onValueChange={setExerciseHabits} required>
                      <SelectTrigger className="h-12 pl-10">
                        <SelectValue placeholder="Select your activity level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                        <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                        <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                        <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                        <SelectItem value="very_active">Very Active (intense exercise daily)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="health" className="font-medium">
                    Current Health Status
                  </Label>
                  <div className="relative">
                    <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Textarea
                      id="health"
                      placeholder="Any permanent health problems or conditions (optional)"
                      value={healthStatus}
                      onChange={(e) => setHealthStatus(e.target.value)}
                      className="pl-10 min-h-[100px]"
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col space-y-4 pt-0">
                <Button
                  type="submit"
                  className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-md"
                >
                  Done
                </Button>
              </CardFooter>
            </form>
          </Card>
        )}

        {step === 1 && (
          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              By signing up, you agree to our{" "}
              <a href="#" className="text-primary hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-primary hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

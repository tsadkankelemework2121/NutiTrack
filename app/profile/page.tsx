"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { useRouter } from "next/navigation"
import { User, Weight, Ruler, Activity, Heart, ArrowLeft } from "lucide-react"
import Link from "next/link"

// Default/sample data for when profile is missing
const defaultProfile = {
  age: 30,
  weight: 70,
  height: 175,
  activityLevel: "moderate" as const,
  healthStatus: "No known health issues",
}

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()
  const router = useRouter()
  
  const [age, setAge] = useState("")
  const [weight, setWeight] = useState("")
  const [height, setHeight] = useState("")
  const [exerciseHabits, setExerciseHabits] = useState<string>("")
  const [healthStatus, setHealthStatus] = useState("")
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    if (user) {
      // Use user profile data if available, otherwise use defaults
      const profile = user.profile || defaultProfile
      setAge(profile.age.toString())
      setWeight(profile.weight.toString())
      setHeight(profile.height.toString())
      setExerciseHabits(profile.activityLevel)
      setHealthStatus((user as any).healthStatus || defaultProfile.healthStatus)
    }
  }, [user])

  const handleSave = () => {
    if (!age || !weight || !height || !exerciseHabits) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please fill in all required fields.",
      })
      return
    }

    try {
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
        sex: user?.profile?.sex || "male" as const,
        height: heightNum,
        weight: weightNum,
        activityLevel: exerciseHabits as "sedentary" | "light" | "moderate" | "active" | "very_active",
        goal: user?.profile?.goal || "maintain" as const,
        mealPreferences: user?.profile?.mealPreferences || [],
        dailyCalorieTarget,
      }

      updateProfile(profile)
      
      // Store health status separately
      if (typeof window !== "undefined") {
        const userData = localStorage.getItem("nutritrack-user")
        if (userData) {
          const userObj = JSON.parse(userData)
          userObj.healthStatus = healthStatus
          localStorage.setItem("nutritrack-user", JSON.stringify(userObj))
        }
      }

      toast({
        title: "Profile updated!",
        description: "Your profile has been successfully updated.",
      })
      
      setIsEditing(false)
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "There was an error updating your profile. Please try again.",
      })
    }
  }

  if (!user) {
    return null
  }

  const profile = user.profile || defaultProfile
  const displayHealthStatus = (user as any).healthStatus || defaultProfile.healthStatus

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 h-screen overflow-y-auto">
        <div className="p-6">
          <Link href="/" className="flex items-center space-x-2 mb-8">
            <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
              NT
            </div>
            <span className="font-bold text-xl">NutriTrack</span>
          </Link>
          <nav className="space-y-2">
            <Link
              href="/dashboard"
              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-muted-foreground hover:bg-muted hover:text-foreground"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Dashboard</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="container flex h-16 items-center px-6">
            <h1 className="text-2xl font-bold">Profile</h1>
          </div>
        </div>

        <div className="flex-1 container px-6 py-8">
          <Card className="max-w-2xl mx-auto border-none shadow-xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-green-600"></div>
            <CardHeader className="space-y-1 pt-6">
              <CardTitle className="text-2xl font-bold text-center">Your Profile</CardTitle>
              <CardDescription className="text-center">
                {isEditing ? "Update your profile information" : "View and manage your profile information"}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {isEditing ? (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="edit-age" className="font-medium">
                      Age
                    </Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="edit-age"
                        type="number"
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
                    <Label htmlFor="edit-weight" className="font-medium">
                      Weight (kg)
                    </Label>
                    <div className="relative">
                      <Weight className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="edit-weight"
                        type="number"
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
                    <Label htmlFor="edit-height" className="font-medium">
                      Height (cm)
                    </Label>
                    <div className="relative">
                      <Ruler className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="edit-height"
                        type="number"
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
                    <Label htmlFor="edit-exercise" className="font-medium">
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
                    <Label htmlFor="edit-health" className="font-medium">
                      Current Health Status
                    </Label>
                    <div className="relative">
                      <Heart className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Textarea
                        id="edit-health"
                        placeholder="Any permanent health problems or conditions (optional)"
                        value={healthStatus}
                        onChange={(e) => setHealthStatus(e.target.value)}
                        className="pl-10 min-h-[100px]"
                      />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <Button
                      onClick={handleSave}
                      className="flex-1 h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-md"
                    >
                      Save Changes
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsEditing(false)
                        // Reset to current values
                        const currentProfile = user.profile || defaultProfile
                        setAge(currentProfile.age.toString())
                        setWeight(currentProfile.weight.toString())
                        setHeight(currentProfile.height.toString())
                        setExerciseHabits(currentProfile.activityLevel)
                        setHealthStatus((user as any).healthStatus || defaultProfile.healthStatus)
                      }}
                      className="flex-1 h-12"
                    >
                      Cancel
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Age</p>
                          <p className="text-lg font-semibold">{profile.age} years</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Weight className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Weight</p>
                          <p className="text-lg font-semibold">{profile.weight} kg</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Ruler className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Height</p>
                          <p className="text-lg font-semibold">{profile.height} cm</p>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Activity className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Exercise Habits</p>
                          <p className="text-lg font-semibold capitalize">{profile.activityLevel}</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-4 border rounded-lg">
                      <div className="flex items-start space-x-3">
                        <Heart className="h-5 w-5 text-muted-foreground mt-0.5" />
                        <div className="flex-1">
                          <p className="text-sm text-muted-foreground mb-1">Current Health Status</p>
                          <p className="text-lg font-semibold">{displayHealthStatus}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button
                      onClick={() => setIsEditing(true)}
                      className="w-full h-12 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-md"
                    >
                      Edit Profile
                    </Button>
                  </div>
                </>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}


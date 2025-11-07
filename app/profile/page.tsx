"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { calculateDailyCalorieTarget } from "@/lib/calorie-calculator"
import { useToast } from "@/components/ui/use-toast"

export default function ProfilePage() {
  const { user, updateProfile } = useAuth()
  const { toast } = useToast()

  const [age, setAge] = useState<string>(user?.profile?.age?.toString() || "")
  const [sex, setSex] = useState<"male" | "female" | undefined>(user?.profile?.sex || undefined)
  const [height, setHeight] = useState<string>(user?.profile?.height?.toString() || "")
  const [weight, setWeight] = useState<string>(user?.profile?.weight?.toString() || "")
  const [activityLevel, setActivityLevel] = useState<
    "sedentary" | "light" | "moderate" | "active" | "very_active" | undefined
  >(user?.profile?.activityLevel || undefined)
  const [goal, setGoal] = useState<"lose" | "maintain" | "gain" | undefined>(user?.profile?.goal || undefined)
  const [mealPreferences, setMealPreferences] = useState<string[]>(user?.profile?.mealPreferences || [])

  // Sync form fields when user data loads
  useEffect(() => {
    if (user?.profile) {
      setAge(user.profile.age?.toString() || "")
      setSex(user.profile.sex)
      setHeight(user.profile.height?.toString() || "")
      setWeight(user.profile.weight?.toString() || "")
      setActivityLevel(user.profile.activityLevel)
      setGoal(user.profile.goal)
      setMealPreferences(user.profile.mealPreferences || [])
    }
  }, [user?.profile])

  const mealPreferenceOptions = [
    { id: "general", label: "General (All Foods)" },
    { id: "vegetarian", label: "Vegetarian" },
    { id: "vegan", label: "Vegan" },
    { id: "gluten-free", label: "Gluten-free" },
    { id: "dairy-free", label: "Dairy-free" },
    { id: "low-carb", label: "Low-carb" },
    { id: "high-protein", label: "High-protein" },
  ]

  const handleMealPreferenceChange = (id: string, checked: boolean) => {
    if (checked) {
      setMealPreferences([...mealPreferences, id])
    } else {
      setMealPreferences(mealPreferences.filter((item) => item !== id))
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const ageNum = age ? Number.parseInt(age, 10) : 30
    const heightNum = height ? Number.parseInt(height, 10) : 175
    const weightNum = weight ? Number.parseFloat(weight) : 70

    const dailyCalorieTarget = calculateDailyCalorieTarget(
      weightNum,
      heightNum,
      ageNum,
      sex || "male",
      activityLevel || "moderate",
      goal || "maintain",
    )

    updateProfile({
      age: ageNum,
      sex: sex || "male",
      height: heightNum,
      weight: weightNum,
      activityLevel: activityLevel || "moderate",
      goal: goal || "maintain",
      mealPreferences,
      dailyCalorieTarget,
    })

    toast({
      title: "Profile updated",
      description: `Your daily calorie target is ${dailyCalorieTarget} calories.`,
    })
  }

  return (
    <div className="flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-2xl">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold">Complete Your Profile</CardTitle>
          <CardDescription>We'll use this information to calculate your personalized nutrition plan</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input
                  id="age"
                  type="number"
                  min="18"
                  max="100"
                  value={age}
                  onChange={(e) => {
                    const value = e.target.value
                    setAge(value === "" ? "" : value)
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Sex</Label>
                <RadioGroup
                  value={sex}
                  onValueChange={(value) => setSex(value as "male" | "female")}
                  className="flex gap-4"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="height">Height (cm)</Label>
                <Input
                  id="height"
                  type="number"
                  min="100"
                  max="250"
                  value={height}
                  onChange={(e) => {
                    const value = e.target.value
                    setHeight(value === "" ? "" : value)
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="weight">Weight (kg)</Label>
                <Input
                  id="weight"
                  type="number"
                  min="30"
                  max="300"
                  step="0.1"
                  value={weight}
                  onChange={(e) => {
                    const value = e.target.value
                    setWeight(value === "" ? "" : value)
                  }}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="activity-level">Activity Level</Label>
                <Select value={activityLevel} onValueChange={(value) => setActivityLevel(value as any)}>
                  <SelectTrigger id="activity-level">
                    <SelectValue placeholder="Select activity level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                    <SelectItem value="light">Light (exercise 1-3 days/week)</SelectItem>
                    <SelectItem value="moderate">Moderate (exercise 3-5 days/week)</SelectItem>
                    <SelectItem value="active">Active (exercise 6-7 days/week)</SelectItem>
                    <SelectItem value="very_active">Very Active (hard exercise daily)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="goal">Goal</Label>
                <Select value={goal} onValueChange={(value) => setGoal(value as any)}>
                  <SelectTrigger id="goal">
                    <SelectValue placeholder="Select your goal" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lose">Lose Weight</SelectItem>
                    <SelectItem value="maintain">Maintain Weight</SelectItem>
                    <SelectItem value="gain">Gain Weight</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Meal Preferences</Label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                {mealPreferenceOptions.map((option) => (
                  <div key={option.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={option.id}
                      checked={mealPreferences.includes(option.id)}
                      onCheckedChange={(checked) => handleMealPreferenceChange(option.id, checked as boolean)}
                    />
                    <Label htmlFor={option.id}>{option.label}</Label>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full">
              Save Profile
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  )
}

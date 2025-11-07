"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { MainNav } from "@/components/main-nav"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { useToast } from "@/components/ui/use-toast"
import { Droplets, Minus, Bell, BellOff, Plus, ThumbsUp } from "lucide-react"
import { recommendWaterIntake } from "@/lib/calorie-calculator"
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend } from "recharts"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for the water intake history
const mockWeeklyData = [
  { day: "Mon", water: 1.8, target: 2.5 },
  { day: "Tue", water: 2.2, target: 2.5 },
  { day: "Wed", water: 2.5, target: 2.5 },
  { day: "Thu", water: 2.0, target: 2.5 },
  { day: "Fri", water: 1.9, target: 2.5 },
  { day: "Sat", water: 2.3, target: 2.5 },
  { day: "Sun", water: 2.1, target: 2.5 },
]

export default function WaterPage() {
  const { user, updateWaterData } = useAuth()
  const { toast } = useToast()

  // Get water consumed from user object or initialize to 0
  const [waterConsumed, setWaterConsumed] = useState(user?.waterConsumed || 0)
  const [remindersEnabled, setRemindersEnabled] = useState(true)
  const [reminderInterval, setReminderInterval] = useState<NodeJS.Timeout | null>(null)
  const [showCongrats, setShowCongrats] = useState(false)

  const waterTarget = user?.profile ? recommendWaterIntake(user.profile.weight) : 2.5
  const waterPercentage = Math.min(Math.round((waterConsumed / waterTarget) * 100), 100)

  const waterRemaining = waterTarget - waterConsumed

  // Update auth provider when water intake changes
  useEffect(() => {
    // Skip the initial render update to prevent loops
    const handleUpdateWater = () => {
      updateWaterData(waterConsumed)
    }

    // Use a timeout to ensure this doesn't cause an infinite loop
    const timeoutId = setTimeout(handleUpdateWater, 0)

    return () => clearTimeout(timeoutId)
  }, [waterConsumed]) // Remove updateWaterData from dependencies

  const handleAddWater = (amount: number) => {
    setWaterConsumed((prevWater) => {
      const newAmount = Math.max(0, prevWater + amount)

      // Show congratulations if target reached
      if (prevWater < waterTarget && newAmount >= waterTarget) {
        setShowCongrats(true)
        setTimeout(() => setShowCongrats(false), 3000)
      }

      return newAmount
    })

    if (amount > 0) {
      toast({
        title: "Water added",
        description: `Added ${amount}L of water to your daily intake.`,
      })
    } else {
      toast({
        title: "Water removed",
        description: `Removed ${Math.abs(amount)}L of water from your daily intake.`,
      })
    }
  }

  const toggleReminders = () => {
    setRemindersEnabled(!remindersEnabled)

    if (remindersEnabled) {
      // Disable reminders
      if (reminderInterval) {
        clearInterval(reminderInterval)
        setReminderInterval(null)
      }

      toast({
        title: "Reminders disabled",
        description: "Water intake reminders have been turned off.",
      })
    } else {
      // Enable reminders
      toast({
        title: "Reminders enabled",
        description: "You'll receive water intake reminders throughout the day.",
      })
    }
  }

  // Set up water reminders
  useEffect(() => {
    if (remindersEnabled && !reminderInterval) {
      // Set reminder every 2 hours (in a real app, this would be more sophisticated)
      const interval = setInterval(
        () => {
          toast({
            title: "Water reminder",
            description: "It's time to drink some water! Stay hydrated.",
          })
        },
        2 * 60 * 60 * 1000,
      ) // 2 hours in milliseconds

      setReminderInterval(interval)
    }

    return () => {
      if (reminderInterval) {
        clearInterval(reminderInterval)
      }
    }
  }, [remindersEnabled, toast])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <MainNav />
        </div>
      </header>
      <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Water Tracker</h1>
          <div className="flex items-center gap-2">
            <p className="text-sm text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Card className="col-span-1 border-none shadow-md overflow-visible">
            <CardHeader className="bg-blue-50 pb-2">
              <CardTitle className="flex items-center">
                <Droplets className="mr-2 h-5 w-5 text-blue-500" />
                Today's Water Intake
              </CardTitle>
              <CardDescription>Track your hydration throughout the day</CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-8 relative">
              {showCongrats && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 z-10 rounded-b-lg">
                  <div className="bg-green-100 p-4 rounded-lg shadow-lg flex items-center space-x-3 animate-bounce">
                    <ThumbsUp className="h-6 w-6 text-green-500" />
                    <p className="font-medium text-green-700">Daily target reached!</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="relative flex items-center justify-center">
                  <svg className="w-48 h-48" viewBox="0 0 100 100">
                    <defs>
                      <linearGradient id="waterGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#60a5fa" />
                        <stop offset="100%" stopColor="#3b82f6" />
                      </linearGradient>
                    </defs>
                    <circle
                      className="text-blue-100"
                      strokeWidth="8"
                      stroke="currentColor"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                    />
                    <circle
                      stroke="url(#waterGradient)"
                      strokeWidth="8"
                      strokeDasharray={`${waterPercentage * 2.51} 251`}
                      strokeLinecap="round"
                      fill="transparent"
                      r="40"
                      cx="50"
                      cy="50"
                      transform="rotate(-90 50 50)"
                    />
                  </svg>
                  <div className="absolute flex flex-col items-center justify-center text-center">
                    <Droplets className="h-10 w-10 text-blue-500 mb-1" />
                    <span className="text-3xl font-bold">{waterConsumed.toFixed(1)}L</span>
                    <span className="text-sm text-muted-foreground">of {waterTarget}L</span>
                  </div>
                </div>

                <div className="w-full">
                  <Progress
                    value={waterPercentage}
                    className="h-2 bg-blue-100"
                    style={{
                      background: "linear-gradient(to right, #60a5fa, #3b82f6)",
                      backgroundSize: `${waterPercentage}% 100%`,
                      backgroundRepeat: "no-repeat",
                    }}
                  />
                  <p className="text-xs text-center text-muted-foreground mt-2">
                    {waterRemaining > 0 ? `${waterRemaining.toFixed(1)}L remaining` : "Daily target reached!"}
                  </p>
                </div>
              </div>

              <div className="flex justify-center space-x-4">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => handleAddWater(-0.1)}
                  disabled={waterConsumed <= 0}
                  className="h-10 w-10 rounded-full"
                >
                  <Minus className="h-4 w-4" />
                  <span className="sr-only">Decrease</span>
                </Button>
                <Button
                  variant="outline"
                  className="px-6 rounded-full border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                  onClick={() => handleAddWater(0.25)}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  250ml
                </Button>
                <Button className="px-6 rounded-full bg-blue-500 hover:bg-blue-600" onClick={() => handleAddWater(0.5)}>
                  <Plus className="h-4 w-4 mr-2" />
                  500ml
                </Button>
                <Button variant="outline" size="icon" onClick={toggleReminders} className="h-10 w-10 rounded-full">
                  {remindersEnabled ? <Bell className="h-4 w-4" /> : <BellOff className="h-4 w-4" />}
                  <span className="sr-only">{remindersEnabled ? "Disable reminders" : "Enable reminders"}</span>
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="col-span-1 lg:col-span-2 border-none shadow-md">
            <CardHeader className="bg-blue-50 pb-2">
              <CardTitle className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-blue-500"
                >
                  <path d="M3 9h18v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V9Z" />
                  <path d="M3 9V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v4" />
                  <path d="M12 12v5" />
                  <path d="M8 12v5" />
                  <path d="M16 12v5" />
                </svg>
                Weekly Water Intake
              </CardTitle>
              <CardDescription>Your hydration history for the past week</CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <ChartContainer
                config={{
                  water: {
                    label: "Water",
                    color: "#3b82f6",
                  },
                  target: {
                    label: "Target",
                    color: "#93c5fd",
                  },
                }}
                className="aspect-[2/1]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWeeklyData}>
                    <defs>
                      <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip content={<ChartTooltipContent />} />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="water"
                      stroke="#3b82f6"
                      strokeWidth={3}
                      activeDot={{ r: 8 }}
                      dot={{ r: 4 }}
                      fillOpacity={1}
                      fill="url(#colorWater)"
                    />
                    <Line type="monotone" dataKey="target" stroke="#93c5fd" strokeWidth={2} strokeDasharray="5 5" />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="border-none shadow-md">
            <CardHeader className="bg-blue-50 pb-2">
              <CardTitle className="flex items-center text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-blue-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="m9 12 2 2 4-4" />
                </svg>
                Benefits of Hydration
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Improves physical performance</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Boosts energy levels and brain function</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Helps prevent and treat headaches</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Aids digestion and prevents constipation</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Helps maintain healthy skin</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="border-none shadow-md">
            <CardHeader className="bg-blue-50 pb-2">
              <CardTitle className="flex items-center text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-blue-500"
                >
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  <path d="M8 11h8" />
                  <path d="M8 15h8" />
                  <path d="M8 7h8" />
                </svg>
                Hydration Tips
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Drink a glass of water first thing in the morning</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Carry a reusable water bottle with you</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Set reminders to drink water throughout the day</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Drink water before, during, and after exercise</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-2 mt-0.5 h-2 w-2 rounded-full bg-blue-500" />
                  <span>Eat water-rich foods like fruits and vegetables</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          <Card className="lg:col-span-2 border-none shadow-md">
            <CardHeader className="bg-blue-50 pb-2">
              <CardTitle className="flex items-center text-base">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-2 h-5 w-5 text-blue-500"
                >
                  <path d="M10 2h4" />
                  <path d="M12 14v-4" />
                  <path d="M4 13a8 8 0 0 1 8-7 8 8 0 0 1 8 7" />
                  <path d="M5 19a2 2 0 0 1-2-2" />
                  <path d="M7 17a2 2 0 0 0-2 2" />
                  <path d="M21 17a2 2 0 0 1-2 2" />
                  <path d="M19 19a2 2 0 0 0 2-2" />
                </svg>
                Water Reminder Schedule
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="space-y-4">
                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Morning Hydration</p>
                    <p className="text-sm text-muted-foreground">Drink 500ml of water after waking up</p>
                  </div>
                  <div className="text-sm font-medium">8:00 AM</div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Mid-Morning</p>
                    <p className="text-sm text-muted-foreground">Drink 250ml of water</p>
                  </div>
                  <div className="text-sm font-medium">10:30 AM</div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Before Lunch</p>
                    <p className="text-sm text-muted-foreground">Drink 250ml of water 30 minutes before eating</p>
                  </div>
                  <div className="text-sm font-medium">12:00 PM</div>
                </div>

                <div className="flex items-center p-3 bg-blue-50 rounded-lg">
                  <div className="mr-4 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                    <Droplets className="h-5 w-5 text-blue-500" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">Afternoon</p>
                    <p className="text-sm text-muted-foreground">Drink 500ml of water throughout the afternoon</p>
                  </div>
                  <div className="text-sm font-medium">2:00 - 4:00 PM</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}

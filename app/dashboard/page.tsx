"use client"

import { useAuth } from "@/components/auth-provider"
import { MainNav } from "@/components/main-nav"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpCircle, ArrowDownCircle, Utensils, Droplets, Dumbbell, Clock, ChevronRight, Bell } from "lucide-react"
import { recommendWaterIntake, recommendProteinIntake } from "@/lib/calorie-calculator"
import {
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts"
import { ThemeToggle } from "@/components/theme-toggle"
import { Button } from "@/components/ui/button"
import { calculateExerciseTime } from "@/lib/exercise-calculator"
import { calculateMacroPercentages, estimateMicronutrients } from "@/lib/nutrition-calculator"

// Mock data for the dashboard
const mockWeeklyData = [
  { day: "Mon", calories: 1850, target: 2000, water: 1.8, waterTarget: 2.5 },
  { day: "Tue", calories: 2100, target: 2000, water: 2.2, waterTarget: 2.5 },
  { day: "Wed", calories: 1950, target: 2000, water: 2.5, waterTarget: 2.5 },
  { day: "Thu", calories: 2200, target: 2000, water: 2.0, waterTarget: 2.5 },
  { day: "Fri", calories: 1800, target: 2000, water: 1.9, waterTarget: 2.5 },
  { day: "Sat", calories: 2300, target: 2000, water: 2.3, waterTarget: 2.5 },
  { day: "Sun", calories: 1900, target: 2000, water: 2.1, waterTarget: 2.5 },
]

export default function DashboardPage() {
  const { user } = useAuth()

  // Get meals and water data from user object
  const todaysMeals = user?.meals || []
  const waterConsumed = user?.waterConsumed || 0

  // Calculate calories consumed from today's meals
  const caloriesConsumed = todaysMeals.reduce((total, meal) => total + meal.calories, 0)

  const calorieTarget = user?.profile?.dailyCalorieTarget || 2000
  const waterTarget = user?.profile ? recommendWaterIntake(user.profile.weight) : 2.5
  const proteinTarget = user?.profile ? recommendProteinIntake(user.profile.weight, user.profile.goal) : 100

  // Calculate protein consumed from today's meals (if available)
  const proteinConsumed = todaysMeals.reduce((total, meal) => total + (meal.protein || 0), 0)

  const caloriesRemaining = calorieTarget - caloriesConsumed
  const caloriePercentage = Math.min(Math.round((caloriesConsumed / calorieTarget) * 100), 100)
  const waterPercentage = Math.min(Math.round((waterConsumed / waterTarget) * 100), 100)
  const proteinPercentage = Math.min(Math.round((proteinConsumed / proteinTarget) * 100), 100)

  // Calculate exercise times for excess calories
  const excessCalories = caloriesConsumed > calorieTarget ? caloriesConsumed - calorieTarget : 0
  const walkingMinutes = calculateExerciseTime(excessCalories, "walking")
  const runningMinutes = calculateExerciseTime(excessCalories, "running")
  const cyclingMinutes = calculateExerciseTime(excessCalories, "cycling")

  // Calculate macronutrient breakdown
  const macros = calculateMacroPercentages(todaysMeals)

  // Get micronutrient data
  const micronutrients = estimateMicronutrients(todaysMeals)

  // Data for macronutrient pie chart
  const macroData = [
    { name: "Protein", value: macros.protein.percentage || 25 },
    { name: "Carbs", value: macros.carbs.percentage || 50 },
    { name: "Fat", value: macros.fat.percentage || 25 },
  ]

  // Use company primary color variations for charts
  const COLORS = [
    "hsl(var(--primary))",
    "hsl(var(--primary) / 0.8)",
    "hsl(var(--primary) / 0.6)",
  ]

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <MainNav />
          <div className="ml-auto flex items-center space-x-4">
            <div className="relative">
              <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground cursor-pointer" />
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-white">
                3
              </span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1 space-y-6 p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              {new Date().toLocaleDateString("en-US", {
                weekday: "long",
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
              Log Meal
              <Utensils className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="border-primary/20 hover:bg-primary/5">
              Log Water
              <Droplets className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-1 bg-gradient-to-r from-primary to-primary/70"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Consumed</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Utensils className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {caloriesConsumed} / {calorieTarget}
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70"
                  style={{ width: `${caloriePercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 flex items-center text-sm text-muted-foreground">
                {caloriesRemaining > 0 ? (
                  <>
                    <ArrowDownCircle className="mr-1 h-4 w-4 text-primary" />
                    <span className="text-primary font-medium">{caloriesRemaining}</span> calories remaining
                  </>
                ) : (
                  <>
                    <ArrowUpCircle className="mr-1 h-4 w-4 text-destructive" />
                    <span className="text-destructive font-medium">{Math.abs(caloriesRemaining)}</span> calories over target
                  </>
                )}
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-1 bg-gradient-to-r from-primary/80 to-primary/60"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Water Intake</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Droplets className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {waterConsumed}L / {waterTarget}L
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/60 to-primary"
                  style={{ width: `${waterPercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 flex items-center text-sm text-muted-foreground">
                <ArrowDownCircle className="mr-1 h-4 w-4 text-primary" />
                <span>{(waterTarget - waterConsumed).toFixed(1)}L</span> remaining
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-1 bg-gradient-to-r from-primary/70 to-primary/50"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Protein Intake</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-4 w-4 text-primary"
                >
                  <path d="M8.4 10.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z" />
                  <path d="M8.4 17.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
                  <path d="M15.6 10.6a2.1 2.1 0 1 1 0-4.2 2.1 2.1 0 0 1 0 4.2Z" />
                  <path d="M15.6 17.6a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z" />
                  <path d="M9 7.8v8.4" />
                  <path d="M15 7.8v8.4" />
                  <path d="M9 12h6" />
                </svg>
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold">
                {proteinConsumed}g / {proteinTarget}g
              </div>
              <div className="mt-4 h-2 w-full rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/50 to-primary"
                  style={{ width: `${proteinPercentage}%` }}
                ></div>
              </div>
              <p className="mt-2 flex items-center text-sm text-muted-foreground">
                <ArrowDownCircle className="mr-1 h-4 w-4 text-primary" />
                <span>{proteinTarget - proteinConsumed}g</span> remaining
              </p>
            </CardContent>
          </Card>

          <Card className="overflow-hidden border-none shadow-md">
            <div className="h-1 bg-gradient-to-r from-primary/60 to-primary/40"></div>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Activity Level</CardTitle>
              <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                <Dumbbell className="h-4 w-4 text-primary" />
              </div>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="text-2xl font-bold capitalize">{user?.profile?.activityLevel || "Not set"}</div>
              <div className="mt-4 h-2 w-full rounded-full bg-primary/10">
                <div
                  className="h-full rounded-full bg-gradient-to-r from-primary/40 to-primary"
                  style={{ width: "60%" }}
                ></div>
              </div>
              <p className="mt-2 flex items-center text-sm text-muted-foreground">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-4 w-4 text-primary"
                >
                  <path d="M8 5.8a4 4 0 1 0 8 0 4 4 0 1 0-8 0" />
                  <path d="M18 10h4" />
                  <path d="M2 10h4" />
                  <path d="M12 2v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 4.93-2.83 2.83" />
                  <path d="M12 18v4" />
                  <path d="M22 18a10 10 0 1 1-20 0" />
                </svg>
                6,500 steps today
              </p>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="bg-background border border-border w-full justify-start p-0 h-auto">
            <TabsTrigger
              value="overview"
              className="rounded-none data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-none data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3"
            >
              Analytics
            </TabsTrigger>
            <TabsTrigger
              value="recommendations"
              className="rounded-none data-[state=active]:bg-primary/5 data-[state=active]:text-primary data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-primary px-4 py-3"
            >
              Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-7">
              <Card className="md:col-span-4 border-none shadow-md">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <div>
                    <CardTitle>Weekly Overview</CardTitle>
                    <CardDescription>Your calorie intake for the past week</CardDescription>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-primary"></div>
                      <span className="text-xs text-muted-foreground">Calories</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <div className="h-3 w-3 rounded-full bg-primary/30"></div>
                      <span className="text-xs text-muted-foreground">Target</span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWeeklyData}>
                        <defs>
                          <linearGradient id="colorCalories" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Area
                          type="monotone"
                          dataKey="calories"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorCalories)"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          stroke="hsl(var(--primary)/0.3)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-3 border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle>Today's Meals</CardTitle>
                  <CardDescription>You've consumed {caloriesConsumed} calories today</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {todaysMeals.length > 0 ? (
                      todaysMeals.map((meal, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors"
                        >
                          <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-sm font-bold text-primary">{meal.type?.charAt(0) || "M"}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium leading-none">{meal.type || "Meal"}</p>
                            <p className="text-sm text-muted-foreground">{meal.name}</p>
                            {meal.protein && meal.carbs && meal.fat && (
                              <p className="text-xs text-muted-foreground">
                                P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                              </p>
                            )}
                          </div>
                          <div className="text-sm font-medium">{meal.calories} kcal</div>
                        </div>
                      ))
                    ) : (
                      <div className="flex flex-col items-center justify-center py-8 text-center">
                        <div className="h-16 w-16 rounded-full bg-muted/30 flex items-center justify-center mb-4">
                          <Utensils className="h-8 w-8 text-muted-foreground" />
                        </div>
                        <h3 className="text-lg font-medium mb-1">No meals logged yet</h3>
                        <p className="text-sm text-muted-foreground max-w-xs">
                          Track your nutrition by logging your meals throughout the day
                        </p>
                        <Button className="mt-4 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
                          Log Your First Meal
                        </Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>

            {excessCalories > 0 && (
              <Card className="border-none shadow-md bg-primary/5">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <CardTitle>Exercise Needed</CardTitle>
                        <CardDescription>
                          You've consumed {excessCalories} calories over your daily target
                        </CardDescription>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M19 5.93 12.73 12.2a1.55 1.55 0 0 1-2.12.11L9.5 11.2a1.55 1.55 0 0 1-.11-2.12L12.73 5.9a1.08 1.08 0 0 1 1.52 0l4.75 4.75a1.08 1.08 0 0 1 0 1.52Z" />
                          <path d="M5 8V6a1 1 0 0 1 1-1h2" />
                          <path d="M5 16v2a1 1 0 0 0 1 1h2" />
                          <path d="M19 16v2a1 1 0 0 1-1 1h-2" />
                          <path d="M19 8V6a1 1 0 0 0-1-1h-2" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Walking</p>
                        <p className="text-2xl font-bold">{walkingMinutes} min</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                          className="h-6 w-6 text-primary"
                        >
                          <path d="M4 17l2 2" />
                          <path d="M10 16v-3.5a2.5 2.5 0 0 0-5 0V16" />
                          <path d="M7 16v-1" />
                          <path d="M15.5 10.5a2.5 2.5 0 0 0-5 0v3" />
                          <path d="M13 10.5v-2a2.5 2.5 0 0 1 5 0v2" />
                          <path d="M18 10.5v-1" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Running</p>
                        <p className="text-2xl font-bold">{runningMinutes} min</p>
                      </div>
                    </div>

                    <div className="flex items-center p-4 bg-white rounded-lg shadow-sm">
                      <div className="mr-4 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                          className="h-6 w-6 text-primary"
                        >
                          <circle cx="12" cy="12" r="3" />
                          <path d="M3 12h1.4a1 1 0 0 0 .8-.4l.9-1.2a1 1 0 0 1 1.8 0l2.2 2.8a1 1 0 0 0 1.8 0l.9-1.2a1 1 0 0 1 .8-.4H17" />
                          <circle cx="5" cy="18" r="1" />
                          <circle cx="19" cy="18" r="1" />
                          <path d="M5 18h14" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Cycling</p>
                        <p className="text-2xl font-bold">{cyclingMinutes} min</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              <Card className="col-span-2 border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Calorie Intake vs. Target</CardTitle>
                      <CardDescription>Your calorie consumption over the past week</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Week
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs">
                        Month
                      </Button>
                      <Button variant="outline" size="sm" className="h-8 text-xs bg-primary/5 text-primary">
                        Year
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWeeklyData}>
                        <defs>
                          <linearGradient id="colorCalories2" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="calories"
                          name="Calories"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorCalories2)"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="target"
                          name="Target"
                          stroke="hsl(var(--primary)/0.3)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle>Macronutrient Breakdown</CardTitle>
                  <CardDescription>Your daily macronutrient distribution</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <div className="w-full h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={macroData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          outerRadius={80}
                          fill="hsl(var(--primary))"
                          dataKey="value"
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        >
                          {macroData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="w-full mt-4 space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[0] }}></div>
                        <span>Protein</span>
                      </div>
                      <div className="flex space-x-2">
                        <span className="font-medium">{macros.protein.grams}g</span>
                        <span className="text-muted-foreground">({macros.protein.percentage}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[1] }}></div>
                        <span>Carbs</span>
                      </div>
                      <div className="flex space-x-2">
                        <span className="font-medium">{macros.carbs.grams}g</span>
                        <span className="text-muted-foreground">({macros.carbs.percentage}%)</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center">
                        <div className="mr-2 h-3 w-3 rounded-full" style={{ backgroundColor: COLORS[2] }}></div>
                        <span>Fat</span>
                      </div>
                      <div className="flex space-x-2">
                        <span className="font-medium">{macros.fat.grams}g</span>
                        <span className="text-muted-foreground">({macros.fat.percentage}%)</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle>Water Intake</CardTitle>
                  <CardDescription>Your water consumption over the past week</CardDescription>
                </CardHeader>
                <CardContent className="pl-2">
                  <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockWeeklyData}>
                        <defs>
                          <linearGradient id="colorWater" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.8} />
                            <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: "white",
                            borderRadius: "8px",
                            border: "none",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                          }}
                        />
                        <Legend />
                        <Area
                          type="monotone"
                          dataKey="water"
                          name="Water"
                          stroke="hsl(var(--primary))"
                          fillOpacity={1}
                          fill="url(#colorWater)"
                          strokeWidth={2}
                          activeDot={{ r: 6 }}
                        />
                        <Line
                          type="monotone"
                          dataKey="waterTarget"
                          name="Target"
                          stroke="hsl(var(--primary) / 0.3)"
                          strokeWidth={2}
                          strokeDasharray="5 5"
                          dot={false}
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="col-span-2 border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle>Micronutrient Analysis</CardTitle>
                  <CardDescription>Your daily vitamin and mineral intake</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {micronutrients.map((nutrient) => (
                      <div key={nutrient.name} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="font-medium">{nutrient.name}</span>
                          <span>
                            {nutrient.value}
                            {nutrient.unit}
                          </span>
                        </div>
                        <div className="h-2 w-full rounded-full bg-muted">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-primary/70 to-primary"
                            style={{ width: `${(nutrient.value / nutrient.target) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="recommendations" className="space-y-6 mt-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Utensils className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Food Recommendations</CardTitle>
                      <CardDescription>
                        Based on your remaining {caloriesRemaining > 0 ? caloriesRemaining : 0} calories
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {caloriesRemaining > 0 ? (
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                              className="h-6 w-6 text-primary"
                            >
                              <path d="M12 2a9 9 0 0 0-9 9c0 3.6 3.96 7.814 9 12 5.04-4.186 9-8.4 9-12a9 9 0 0 0-9-9Zm0 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                            </svg>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Greek Yogurt with Berries</p>
                            <p className="text-xs text-muted-foreground">15g protein • 20g carbs • 2g fat</p>
                          </div>
                        </div>
                        <div className="font-medium">150 kcal</div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                              className="h-6 w-6 text-primary"
                            >
                              <path d="M12 2a9 9 0 0 0-9 9c0 3.6 3.96 7.814 9 12 5.04-4.186 9-8.4 9-12a9 9 0 0 0-9-9Zm0 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                            </svg>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Protein Smoothie</p>
                            <p className="text-xs text-muted-foreground">20g protein • 30g carbs • 5g fat</p>
                          </div>
                        </div>
                        <div className="font-medium">250 kcal</div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
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
                              className="h-6 w-6 text-primary"
                            >
                              <path d="M12 2a9 9 0 0 0-9 9c0 3.6 3.96 7.814 9 12 5.04-4.186 9-8.4 9-12a9 9 0 0 0-9-9Zm0 11a2 2 0 1 1 0-4 2 2 0 0 1 0 4Z" />
                            </svg>
                          </div>
                          <div className="space-y-1">
                            <p className="font-medium">Oatmeal with Fruit</p>
                            <p className="text-xs text-muted-foreground">8g protein • 35g carbs • 3g fat</p>
                          </div>
                        </div>
                        <div className="font-medium">200 kcal</div>
                      </div>

                      <div className="flex justify-center mt-4">
                        <Button variant="outline" className="text-primary">
                          View More Suggestions
                          <ChevronRight className="ml-1 h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <div className="p-4 bg-destructive/10 rounded-lg">
                        <h3 className="font-medium text-destructive mb-2 flex items-center">
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
                            className="h-5 w-5 mr-2"
                          >
                            <circle cx="12" cy="12" r="10" />
                            <line x1="12" x2="12" y1="8" y2="12" />
                            <line x1="12" x2="12.01" y1="16" y2="16" />
                          </svg>
                          You've exceeded your calorie target
                        </h3>
                        <p className="text-sm text-destructive/80 mb-4">
                          Consider these exercises to burn the excess calories:
                        </p>
                        <div className="space-y-3">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Dumbbell className="h-4 w-4 text-primary" />
                              <p className="text-sm font-medium">Walking</p>
                            </div>
                            <div className="font-medium">{walkingMinutes} min</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Dumbbell className="h-4 w-4 text-primary" />
                              <p className="text-sm font-medium">Running</p>
                            </div>
                            <div className="font-medium">{runningMinutes} min</div>
                          </div>
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <Dumbbell className="h-4 w-4 text-primary" />
                              <p className="text-sm font-medium">Cycling</p>
                            </div>
                            <div className="font-medium">{cyclingMinutes} min</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                      <Droplets className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Water Intake Reminders</CardTitle>
                      <CardDescription>Stay hydrated throughout the day</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Morning Reminder</p>
                        <p className="text-sm text-muted-foreground">Drink a glass of water after waking up</p>
                      </div>
                      <div className="text-sm font-medium">8:00 AM</div>
                    </div>

                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Before Lunch</p>
                        <p className="text-sm text-muted-foreground">Drink water 30 minutes before your meal</p>
                      </div>
                      <div className="text-sm font-medium">11:30 AM</div>
                    </div>

                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Afternoon Reminder</p>
                        <p className="text-sm text-muted-foreground">Stay hydrated during work hours</p>
                      </div>
                      <div className="text-sm font-medium">2:30 PM</div>
                    </div>

                    <div className="flex items-center p-4 bg-primary/5 rounded-lg">
                      <div className="mr-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                        <Droplets className="h-6 w-6 text-primary" />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="font-medium">Before Dinner</p>
                        <p className="text-sm text-muted-foreground">Drink water 30 minutes before your meal</p>
                      </div>
                      <div className="text-sm font-medium">6:00 PM</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="border-none shadow-md">
              <CardHeader className="pb-2">
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center mr-3">
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
                      className="h-5 w-5 text-primary"
                    >
                      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
                      <path d="M7 2v20" />
                      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>Weekly Meal Plan Suggestions</CardTitle>
                    <CardDescription>Based on your nutritional goals and preferences</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid gap-4 md:grid-cols-7">
                  {["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"].map((day, index) => (
                    <div key={index} className="space-y-3 p-4 bg-muted/30 rounded-lg">
                      <h3 className="font-medium text-center">{day}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-primary">Breakfast</p>
                        <p className="text-muted-foreground">Oatmeal with fruits</p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-primary">Lunch</p>
                        <p className="text-muted-foreground">Chicken salad</p>
                      </div>
                      <div className="space-y-1 text-sm">
                        <p className="font-medium text-primary">Dinner</p>
                        <p className="text-muted-foreground">Salmon with vegetables</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-center mt-6">
                  <Button className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 text-white">
                    Generate Custom Meal Plan
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

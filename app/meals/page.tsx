"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/components/auth-provider"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/components/ui/use-toast"
import { Plus, Search, Utensils, X, BarChart3, Droplets, Bell } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ThemeToggle } from "@/components/theme-toggle"

// Mock meal data
const mealTypes = ["Breakfast", "Lunch", "Dinner", "Snack"]

const recentMeals = [
  { id: 1, name: "Oatmeal with Berries", calories: 350, protein: 15, carbs: 60, fat: 7 },
  { id: 2, name: "Grilled Chicken Salad", calories: 450, protein: 40, carbs: 10, fat: 25 },
  { id: 3, name: "Salmon with Quinoa", calories: 550, protein: 35, carbs: 40, fat: 25 },
  { id: 4, name: "Greek Yogurt with Honey", calories: 200, protein: 20, carbs: 25, fat: 5 },
  { id: 5, name: "Protein Smoothie", calories: 300, protein: 25, carbs: 30, fat: 10 },
]

// Mock food database for search
const foodDatabase = [
  { id: 1, name: "Apple", calories: 95, protein: 0.5, carbs: 25, fat: 0.3 },
  { id: 2, name: "Banana", calories: 105, protein: 1.3, carbs: 27, fat: 0.4 },
  { id: 3, name: "Chicken Breast", calories: 165, protein: 31, carbs: 0, fat: 3.6 },
  { id: 4, name: "Salmon", calories: 206, protein: 22, carbs: 0, fat: 13 },
  { id: 5, name: "Brown Rice", calories: 215, protein: 5, carbs: 45, fat: 1.8 },
  { id: 6, name: "Avocado", calories: 240, protein: 3, carbs: 12, fat: 22 },
  { id: 7, name: "Egg", calories: 78, protein: 6, carbs: 0.6, fat: 5 },
  { id: 8, name: "Greek Yogurt", calories: 100, protein: 17, carbs: 6, fat: 0.4 },
  { id: 9, name: "Spinach", calories: 23, protein: 2.9, carbs: 3.6, fat: 0.4 },
  { id: 10, name: "Sweet Potato", calories: 112, protein: 2, carbs: 26, fat: 0.1 },
]

export default function MealsPage() {
  const { user, updateMealData, logout } = useAuth()
  const { toast } = useToast()
  const pathname = usePathname()
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedMealType, setSelectedMealType] = useState("Breakfast")
  const [customMealName, setCustomMealName] = useState("")
  const [customMealCalories, setCustomMealCalories] = useState("")

  // Get meals from user object or initialize empty array
  const [todaysMeals, setTodaysMeals] = useState<
    Array<{
      id: number
      name: string
      type: string
      calories: number
      protein?: number
      carbs?: number
      fat?: number
    }>
  >(user?.meals || [])

  // Update auth provider when meals change
  useEffect(() => {
    // Skip the initial render update to prevent loops
    const handleUpdateMeals = () => {
      updateMealData(todaysMeals)
    }

    // Use a timeout to ensure this doesn't cause an infinite loop
    const timeoutId = setTimeout(handleUpdateMeals, 0)

    return () => clearTimeout(timeoutId)
  }, [todaysMeals]) // Remove updateMealData from dependencies

  const filteredFoods = foodDatabase.filter((food) => food.name.toLowerCase().includes(searchTerm.toLowerCase()))

  const totalCaloriesConsumed = todaysMeals.reduce((sum, meal) => sum + meal.calories, 0)
  const calorieTarget = user?.profile?.dailyCalorieTarget || 2000
  const caloriesRemaining = calorieTarget - totalCaloriesConsumed

  const handleAddCustomMeal = () => {
    if (!customMealName || !customMealCalories) {
      toast({
        variant: "destructive",
        title: "Missing information",
        description: "Please provide both meal name and calories.",
      })
      return
    }

    const newMeal = {
      id: Date.now(),
      type: selectedMealType,
      name: customMealName,
      calories: Number.parseInt(customMealCalories),
    }

    setTodaysMeals((prevMeals) => {
      const updatedMeals = [...prevMeals, newMeal]
      return updatedMeals
    })

    setCustomMealName("")
    setCustomMealCalories("")

    toast({
      title: "Meal added",
      description: `${customMealName} (${customMealCalories} kcal) added to your log.`,
    })
  }

  const handleAddFood = (food: (typeof foodDatabase)[0]) => {
    const newMeal = {
      id: Date.now(),
      type: selectedMealType,
      name: food.name,
      calories: food.calories,
      protein: food.protein,
      carbs: food.carbs,
      fat: food.fat,
    }

    setTodaysMeals((prevMeals) => {
      const updatedMeals = [...prevMeals, newMeal]
      return updatedMeals
    })

    toast({
      title: "Food added",
      description: `${food.name} (${food.calories} kcal) added to your ${selectedMealType.toLowerCase()}.`,
    })
  }

  const handleAddRecentMeal = (meal: (typeof recentMeals)[0]) => {
    const newMeal = {
      id: Date.now(),
      type: selectedMealType,
      name: meal.name,
      calories: meal.calories,
      protein: meal.protein,
      carbs: meal.carbs,
      fat: meal.fat,
    }

    setTodaysMeals((prevMeals) => {
      const updatedMeals = [...prevMeals, newMeal]
      return updatedMeals
    })

    toast({
      title: "Meal added",
      description: `${meal.name} (${meal.calories} kcal) added to your ${selectedMealType.toLowerCase()}.`,
    })
  }

  const handleRemoveMeal = (id: number) => {
    setTodaysMeals((prevMeals) => {
      return prevMeals.filter((meal) => meal.id !== id)
    })

    toast({
      title: "Meal removed",
      description: "The meal has been removed from your log.",
    })
  }

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
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/dashboard"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <BarChart3 className="h-5 w-5" />
              <span>Dashboard</span>
            </Link>
            <Link
              href="/meals"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/meals"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Utensils className="h-5 w-5" />
              <span>Meals</span>
            </Link>
            <Link
              href="/water"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/water"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Droplets className="h-5 w-5" />
              <span>Water</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
          <div className="container flex h-16 items-center justify-end px-6">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5 text-muted-foreground hover:text-foreground" />
                <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-primary text-[10px] font-medium flex items-center justify-center text-white">
                  3
                </span>
              </Button>
              <ThemeToggle />
              <Button variant="ghost" onClick={logout}>
                Logout
              </Button>
            </div>
          </div>
        </header>
        <main className="flex-1 space-y-4 p-4 md:p-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold tracking-tight">Meal Tracker</h1>
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

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Calories Consumed</CardTitle>
              <Utensils className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {totalCaloriesConsumed} / {calorieTarget}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                {caloriesRemaining > 0
                  ? `${caloriesRemaining} calories remaining`
                  : `${Math.abs(caloriesRemaining)} calories over target`}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Today's Meals</CardTitle>
              <CardDescription>Track what you've eaten today</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {todaysMeals.length > 0 ? (
                  todaysMeals.map((meal) => (
                    <div key={meal.id} className="flex items-center justify-between border-b pb-2">
                      <div className="flex items-center">
                        <div className="mr-4 flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
                          <span className="text-xs font-bold">{meal.type.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium">{meal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            {meal.type} •{" "}
                            {meal.protein && meal.carbs && meal.fat
                              ? `P: ${meal.protein}g • C: ${meal.carbs}g • F: ${meal.fat}g`
                              : "No detailed nutrition info"}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{meal.calories} kcal</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8"
                          onClick={() => handleRemoveMeal(meal.id)}
                        >
                          <X className="h-4 w-4" />
                          <span className="sr-only">Remove</span>
                        </Button>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <Utensils className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">No meals logged yet</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Add your first meal using the form on the right
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-4">
            <CardHeader>
              <CardTitle>Add Food</CardTitle>
              <CardDescription>Log your meals for accurate tracking</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="search">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="search">Search</TabsTrigger>
                  <TabsTrigger value="recent">Recent</TabsTrigger>
                  <TabsTrigger value="custom">Custom</TabsTrigger>
                </TabsList>

                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="meal-type">Meal Type</Label>
                    <Select value={selectedMealType} onValueChange={setSelectedMealType}>
                      <SelectTrigger id="meal-type">
                        <SelectValue placeholder="Select meal type" />
                      </SelectTrigger>
                      <SelectContent>
                        {mealTypes.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <TabsContent value="search" className="space-y-4 mt-4">
                  <div className="flex items-center space-x-2">
                    <div className="relative flex-1">
                      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search foods..."
                        className="pl-8"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="border rounded-md">
                    {filteredFoods.length > 0 ? (
                      <div className="divide-y">
                        {filteredFoods.map((food) => (
                          <div key={food.id} className="flex items-center justify-between p-3">
                            <div>
                              <p className="font-medium">{food.name}</p>
                              <p className="text-xs text-muted-foreground">
                                P: {food.protein}g • C: {food.carbs}g • F: {food.fat}g
                              </p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="text-sm">{food.calories} kcal</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8"
                                onClick={() => handleAddFood(food)}
                              >
                                <Plus className="h-4 w-4" />
                                <span className="sr-only">Add</span>
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="p-4 text-center text-muted-foreground">
                        {searchTerm ? "No foods found matching your search" : "Type to search for foods"}
                      </div>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="recent" className="space-y-4 mt-4">
                  <div className="border rounded-md divide-y">
                    {recentMeals.map((meal) => (
                      <div key={meal.id} className="flex items-center justify-between p-3">
                        <div>
                          <p className="font-medium">{meal.name}</p>
                          <p className="text-xs text-muted-foreground">
                            P: {meal.protein}g • C: {meal.carbs}g • F: {meal.fat}g
                          </p>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="text-sm">{meal.calories} kcal</span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleAddRecentMeal(meal)}
                          >
                            <Plus className="h-4 w-4" />
                            <span className="sr-only">Add</span>
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="custom" className="space-y-4 mt-4">
                  <div className="space-y-4">
                    <div className="grid gap-2">
                      <Label htmlFor="meal-name">Meal Name</Label>
                      <Input
                        id="meal-name"
                        placeholder="e.g., Homemade Pasta"
                        value={customMealName}
                        onChange={(e) => setCustomMealName(e.target.value)}
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="calories">Calories</Label>
                      <Input
                        id="calories"
                        type="number"
                        placeholder="e.g., 450"
                        value={customMealCalories}
                        onChange={(e) => setCustomMealCalories(e.target.value)}
                      />
                    </div>

                    <Button onClick={handleAddCustomMeal} className="w-full">
                      Add Custom Meal
                    </Button>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
        </main>
      </div>
    </div>
  )
}

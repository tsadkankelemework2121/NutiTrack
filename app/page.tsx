"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, Droplets, BarChart3, ShoppingBasket, ChevronRight, Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export default function Home() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white font-bold text-xl">
                NT
              </div>
              <span className="font-bold text-xl text-black dark:text-white">NutriTrack</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="/" className="text-black dark:text-white transition-colors hover:text-green-500">
                Home
              </Link>
              <Link href="#features" className="text-black dark:text-white transition-colors hover:text-green-500">
                Features
              </Link>
              <Link href="#how-it-works" className="text-black dark:text-white transition-colors hover:text-green-500">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-black dark:text-white transition-colors hover:text-green-500">
                Testimonials
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleTheme}
                className="h-9 w-9 text-black dark:text-white hover:bg-green-500/5"
                aria-label="Toggle theme"
                suppressHydrationWarning
              >
                {mounted ? (
                  <>
                    <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  </>
                ) : (
                  <Sun className="h-5 w-5" />
                )}
              </Button>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="font-medium text-black dark:text-white hover:text-green-500 hover:bg-green-500/5">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium"
                >
                  Register
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden h-[650px] flex items-center">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat z-0"
            style={{ backgroundImage: 'url(/herobg.png)' }}
          ></div>
          <div className="absolute inset-0 z-[1]"></div>
          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-[55px] font-bold tracking-tight leading-tight text-black dark:text-white font-shrikhand">
                    Eat Smart <span className="text-black dark:text-white">with What</span> <br />
                    You <span className="text-black dark:text-white">Already Have</span>
                  </h1>
                  <p className="max-w-[600px] text-[18px] text-black dark:text-white">
                    NutriTrack helps you create healthy, personalized meals while guiding you toward healthier eating
                    habits.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-full px-8"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4 text-white" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 border-black dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 font-medium text-black dark:text-white"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 flex items-center space-x-4 text-[18px]">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-transparent border-2 border-black dark:border-white flex items-center justify-center">
                      <span className="text-xs">🥗</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-transparent border-2 border-black dark:border-white flex items-center justify-center">
                      <span className="text-xs">💧</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-transparent border-2 border-black dark:border-white flex items-center justify-center">
                      <span className="text-xs">🏃</span>
                    </div>
                  </div>
                  <span className="text-black dark:text-white">
                    Join <span className="font-medium text-black dark:text-white">10,000+</span> health enthusiasts
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center h-[650px]">
                <img
                  src="/Vegitabke.png"
                  alt="Fresh Vegetables"
                  className="h-[650px] w-auto object-contain"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/4 h-1/4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-3xl z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-[36px] font-bold tracking-tight text-black dark:text-white">
                Amazing Features
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-black dark:text-white">
                Discover all the powerful tools that make NutriTrack the ultimate nutrition companion
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 text-white">
                  <ShoppingBasket className="h-7 w-7" />
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Ingredient Inventory</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Input what ingredients you already have and get personalized meal suggestions that work with what you
                  have on hand.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 text-white">
                  <Apple className="h-7 w-7" />
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Smart Meal Suggestions</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Receive meal recommendations based on your available ingredients, dietary preferences, and health
                  goals.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 text-white">
                  <Droplets className="h-7 w-7" />
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Water Reminders</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Get timely notifications to stay hydrated throughout the day with customizable water intake goals.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center mb-4 text-white">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Nutrition Insights</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Track your nutritional intake and receive personalized insights to help you meet your health goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-green-50 dark:bg-green-950/20 relative overflow-hidden">
          <div className="absolute left-0 top-0 w-1/4 h-1/4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-3xl z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-[36px] font-bold tracking-tighter text-black dark:text-white">
                How NutriTrack Works
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-black dark:text-white">
                Our intelligent system helps you eat healthier with what you already have, eliminating food waste and
                simplifying meal planning.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-500">1</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white -mr-1 -mt-1">
                    <ShoppingBasket className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Add Your Ingredients</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Input the ingredients you have available in your kitchen pantry and refrigerator.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-500">2</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white -mr-1 -mt-1">
                    <Apple className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-[28px] font-bold mb-2 text-black dark:text-white">Get Personalized Suggestions</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Our AI analyzes your ingredients and preferences to suggest perfect meals for you.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-green-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-green-500">3</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-green-500 flex items-center justify-center text-white -mr-1 -mt-1">
                    <BarChart3 className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-[36px] font-bold mb-2 text-black dark:text-white">Track Your Progress</h3>
                <p className="text-[18px] text-black dark:text-white">
                  Monitor your nutrition, water intake, and health goals with detailed insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Food Gallery Section */}
        <section className="py-20 bg-background relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/4 h-1/4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-3xl z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-[36px] font-bold tracking-tight text-black dark:text-white">
                Delicious <span className="text-black dark:text-white">Meal Ideas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-black dark:text-white">
                Get inspired with these healthy and tasty meal suggestions based on common ingredients
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/food1.png"
                  alt="Healthy Meal"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium text-[18px]">Mediterranean Bowl</h3>
                    <p className="text-xs">Quinoa, chickpeas, cucumber, tomatoes</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/food2.png"
                  alt="Healthy Meal"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium text-[18px]">Berry Protein Smoothie</h3>
                    <p className="text-xs">Mixed berries, Greek yogurt, honey</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/food3.png"
                  alt="Healthy Meal"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium text-[18px]">Veggie Stir Fry</h3>
                    <p className="text-xs">Bell peppers, broccoli, carrots, tofu</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/food4.png"
                  alt="Healthy Meal"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium text-[18px]">Avocado Toast</h3>
                    <p className="text-xs">Whole grain bread, avocado, cherry tomatoes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-full px-8 text-[18px]">
                  Discover More Recipes
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-background relative overflow-hidden">
          <div className="absolute left-0 bottom-0 w-1/4 h-1/4 bg-gradient-to-br from-green-500/10 to-green-600/10 rounded-full blur-3xl z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="text-center mb-12">
              <h2 className="text-[36px] font-bold tracking-tight text-black dark:text-white">
                What Our <span className="text-black dark:text-white">Users Say</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-black dark:text-white">
                Hear from people who have transformed their eating habits with NutriTrack
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-[18px] text-black dark:text-white">Sarah Johnson</h4>
                    <p className="text-sm text-[18px] text-black dark:text-white">Lost 15 pounds in 3 months</p>
                  </div>
                </div>
                <p className="text-[18px] text-black dark:text-white">
                  "NutriTrack completely changed how I approach cooking. I waste less food and eat much healthier meals
                  using what I already have!"
                </p>
                <div className="mt-4 flex">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-[18px] text-black dark:text-white">Michael Rodriguez</h4>
                    <p className="text-sm text-[18px] text-black dark:text-white">Fitness enthusiast</p>
                  </div>
                </div>
                <p className="text-[18px] text-black dark:text-white">
                  "The macro tracking is incredibly accurate. I've been able to hit my protein goals consistently and
                  see real progress in my workouts."
                </p>
                <div className="mt-4 flex">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-green-500/10">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-green-500/10 mr-4"></div>
                  <div>
                    <h4 className="font-medium text-[18px] text-black dark:text-white">Emily Chen</h4>
                    <p className="text-sm text-[18px] text-black dark:text-white">Busy parent</p>
                  </div>
                </div>
                <p className="text-[18px] text-black dark:text-white">
                  "The water tracking reminders have been a game-changer for me. I'm finally staying properly hydrated
                  and feeling so much better!"
                </p>
                <div className="mt-4 flex">
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <svg className="h-5 w-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-green-500/10 to-green-600/10 relative overflow-hidden">
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-green-500/20 to-green-600/20 rounded-full blur-3xl z-0"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-green-500 to-green-600 flex items-center justify-center text-white">
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
                  className="h-6 w-6"
                >
                  <path d="M12 2v4" />
                  <path d="M12 18v4" />
                  <path d="m4.93 4.93 2.83 2.83" />
                  <path d="m16.24 16.24 2.83 2.83" />
                  <path d="M2 12h4" />
                  <path d="M18 12h4" />
                  <path d="m4.93 19.07 2.83-2.83" />
                  <path d="m16.24 7.76 2.83-2.83" />
                </svg>
              </div>
              <h2 className="text-[36px] font-bold tracking-tight text-black dark:text-white">
                Start Your Healthy Eating Journey <span className="text-black dark:text-white">Today</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-[18px] text-black dark:text-white mb-8">
                Create an account to get personalized meal suggestions based on the ingredients you have at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-full px-8 text-[18px]"
                  >
                    Sign Up Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-black dark:border-white/20 hover:bg-black/5 dark:hover:bg-white/5 font-medium text-black dark:text-white text-[18px]"
                  >
                    Login
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="h-8 w-8 rounded-full bg-gradient-to-r from-primary to-green-500 flex items-center justify-center text-white font-bold">
                  NT
                </div>
                <span className="font-bold text-lg">NutriTrack</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Your personal nutrition assistant for healthier eating habits.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-4">Product</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Testimonials
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    About
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Blog
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Careers
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Terms
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Cookies
                  </a>
                </li>
                <li>
                  <a href="#" className="text-muted-foreground hover:text-primary">
                    Licenses
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-center text-sm text-muted-foreground md:text-left">
              © 2024 NutriTrack. All rights reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 md:mt-0">
              <a href="#" className="text-muted-foreground hover:text-primary">
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                </svg>
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
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
                  className="h-5 w-5"
                >
                  <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

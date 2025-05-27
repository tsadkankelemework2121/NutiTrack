import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, Apple, Droplets, BarChart3, ShoppingBasket, ChevronRight } from "lucide-react"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center">
          <div className="mr-4 flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <div className="h-9 w-9 rounded-full bg-gradient-to-r from-primary to-green-500 flex items-center justify-center text-white font-bold text-xl">
                NT
              </div>
              <span className="font-bold text-xl text-foreground">NutriTrack</span>
            </Link>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link href="#features" className="text-foreground/80 transition-colors hover:text-primary">
                Features
              </Link>
              <Link href="#how-it-works" className="text-foreground/80 transition-colors hover:text-primary">
                How It Works
              </Link>
              <Link href="#testimonials" className="text-foreground/80 transition-colors hover:text-primary">
                Testimonials
              </Link>
              <Link href="#pricing" className="text-foreground/80 transition-colors hover:text-primary">
                Pricing
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <nav className="flex items-center space-x-2">
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="font-medium text-foreground/80 hover:text-primary hover:bg-primary/5">
                  Login
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button
                  size="sm"
                  className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-medium"
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
        <section className="relative overflow-hidden py-20 md:py-32">
          <div className="absolute inset-0 bg-gradient-to-br from-secondary via-background to-background z-0"></div>
          <div className="absolute right-0 top-0 w-1/3 h-1/3 bg-gradient-to-br from-primary/20 to-green-500/20 rounded-full blur-3xl z-0"></div>
          <div className="absolute left-0 bottom-0 w-1/3 h-1/3 bg-gradient-to-br from-green-500/20 to-primary/20 rounded-full blur-3xl z-0"></div>

          <div className="container relative z-10 px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_600px] lg:gap-12 xl:grid-cols-[1fr_700px]">
              <div className="flex flex-col justify-center space-y-6">
                <div className="space-y-4">
                  <h1 className="text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl/none text-foreground">
                    Eat Smart <span className="gradient-text">with What</span> <br />
                    You <span className="gradient-text">Already Have</span>
                  </h1>
                  <p className="max-w-[600px] text-foreground/80 md:text-xl">
                    NutriTrack helps you create healthy, personalized meals while guiding you toward healthier eating
                    habits.
                  </p>
                </div>
                <div className="flex flex-col gap-3 min-[400px]:flex-row">
                  <Link href="/auth/register">
                    <Button
                      size="lg"
                      className="gap-1.5 bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-medium rounded-full px-8"
                    >
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="#how-it-works">
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full px-8 border-primary/20 hover:bg-primary/5 font-medium text-foreground/80"
                    >
                      Learn More
                    </Button>
                  </Link>
                </div>

                <div className="mt-6 flex items-center space-x-4 text-sm">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <span className="text-xs">🥗</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <span className="text-xs">💧</span>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-secondary border-2 border-background flex items-center justify-center">
                      <span className="text-xs">🏃</span>
                    </div>
                  </div>
                  <span className="text-foreground/70">
                    Join <span className="font-medium text-foreground">10,000+</span> health enthusiasts
                  </span>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative">
                  <div className="rounded-2xl overflow-hidden shadow-2xl pop-in">
                    <img
                      src="/placeholder.svg?height=600&width=800"
                      alt="NutriTrack App Interface"
                      className="w-full h-auto"
                    />
                  </div>
                  <div className="absolute -right-8 top-1/4 glass-effect rounded-xl p-3 shadow-lg pop-in animation-delay-200">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                        <Droplets className="h-5 w-5 text-blue-500" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Water Reminder</p>
                        <p className="text-xs text-muted-foreground">Stay hydrated! 💧</p>
                      </div>
                    </div>
                  </div>
                  <div className="absolute -left-8 bottom-1/4 glass-effect rounded-xl p-3 shadow-lg pop-in animation-delay-300">
                    <div className="flex items-center space-x-2">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                        <Apple className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">Meal Suggestion</p>
                        <p className="text-xs text-muted-foreground">Based on your ingredients 🥗</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-foreground">
                <span className="gradient-text">Amazing Features</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-foreground/80 md:text-xl">
                Discover all the powerful tools that make NutriTrack the ultimate nutrition companion
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-primary/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-primary to-green-500 flex items-center justify-center mb-4 text-white">
                  <ShoppingBasket className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Ingredient Inventory</h3>
                <p className="text-foreground/70">
                  Input what ingredients you already have and get personalized meal suggestions that work with what you
                  have on hand.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-primary/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-blue-400 flex items-center justify-center mb-4 text-white">
                  <Apple className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Smart Meal Suggestions</h3>
                <p className="text-foreground/70">
                  Receive meal recommendations based on your available ingredients, dietary preferences, and health
                  goals.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-primary/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-blue-300 flex items-center justify-center mb-4 text-white">
                  <Droplets className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Water Reminders</h3>
                <p className="text-foreground/70">
                  Get timely notifications to stay hydrated throughout the day with customizable water intake goals.
                </p>
              </div>

              <div className="bg-background rounded-xl p-6 shadow-md card-hover border border-primary/10">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-purple-500 to-purple-400 flex items-center justify-center mb-4 text-white">
                  <BarChart3 className="h-7 w-7" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-foreground">Nutrition Insights</h3>
                <p className="text-foreground/70">
                  Track your nutritional intake and receive personalized insights to help you meet your health goals.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-gradient-to-b from-white to-secondary/50">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                How <span className="gradient-text">NutriTrack</span> Works
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Our intelligent system helps you eat healthier with what you already have, eliminating food waste and
                simplifying meal planning.
              </p>
            </div>

            <div className="grid gap-12 md:grid-cols-3">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-primary">1</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-primary flex items-center justify-center text-white -mr-1 -mt-1">
                    <ShoppingBasket className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Add Your Ingredients</h3>
                <p className="text-muted-foreground">
                  Input the ingredients you have available in your kitchen pantry and refrigerator.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-blue-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-blue-500">2</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-blue-500 flex items-center justify-center text-white -mr-1 -mt-1">
                    <Apple className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Get Personalized Suggestions</h3>
                <p className="text-muted-foreground">
                  Our AI analyzes your ingredients and preferences to suggest perfect meals for you.
                </p>
              </div>

              <div className="flex flex-col items-center text-center">
                <div className="relative mb-8">
                  <div className="h-16 w-16 rounded-full bg-purple-500/10 flex items-center justify-center">
                    <span className="text-2xl font-bold text-purple-500">3</span>
                  </div>
                  <div className="absolute top-0 right-0 h-6 w-6 rounded-full bg-purple-500 flex items-center justify-center text-white -mr-1 -mt-1">
                    <BarChart3 className="h-3 w-3" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mb-2">Track Your Progress</h3>
                <p className="text-muted-foreground">
                  Monitor your nutrition, water intake, and health goals with detailed insights.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Food Gallery Section */}
        <section className="py-20 bg-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Delicious <span className="gradient-text">Meal Ideas</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Get inspired with these healthy and tasty meal suggestions based on common ingredients
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Healthy Salad Bowl"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium">Mediterranean Bowl</h3>
                    <p className="text-xs">Quinoa, chickpeas, cucumber, tomatoes</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Protein Smoothie"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium">Berry Protein Smoothie</h3>
                    <p className="text-xs">Mixed berries, Greek yogurt, honey</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Chicken Stir Fry"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium">Veggie Stir Fry</h3>
                    <p className="text-xs">Bell peppers, broccoli, carrots, tofu</p>
                  </div>
                </div>
              </div>

              <div className="relative group overflow-hidden rounded-xl">
                <img
                  src="/placeholder.svg?height=300&width=300"
                  alt="Avocado Toast"
                  className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                  <div className="p-4 text-white">
                    <h3 className="font-medium">Avocado Toast</h3>
                    <p className="text-xs">Whole grain bread, avocado, cherry tomatoes</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-8 text-center">
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-medium rounded-full px-8">
                  Discover More Recipes
                  <ChevronRight className="h-4 w-4 ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20 bg-gradient-to-b from-secondary/50 to-white">
          <div className="container px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                What Our <span className="gradient-text">Users Say</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Hear from people who have transformed their eating habits with NutriTrack
              </p>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Sarah Johnson</h4>
                    <p className="text-sm text-muted-foreground">Lost 15 pounds in 3 months</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
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

              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Michael Rodriguez</h4>
                    <p className="text-sm text-muted-foreground">Fitness enthusiast</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
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

              <div className="bg-white rounded-xl p-6 shadow-md card-hover border border-gray-100">
                <div className="flex items-center mb-4">
                  <div className="h-12 w-12 rounded-full bg-gray-100 mr-4"></div>
                  <div>
                    <h4 className="font-medium">Emily Chen</h4>
                    <p className="text-sm text-muted-foreground">Busy parent</p>
                  </div>
                </div>
                <p className="text-muted-foreground">
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
        <section className="py-20 bg-gradient-to-r from-primary/10 to-green-500/10">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center text-center">
              <div className="mb-4 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-green-500 flex items-center justify-center text-white">
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
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Start Your Healthy Eating Journey <span className="gradient-text">Today</span>
              </h2>
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl mb-8">
                Create an account to get personalized meal suggestions based on the ingredients you have at home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-primary to-green-500 hover:from-primary/90 hover:to-green-500/90 text-white font-medium rounded-full px-8"
                  >
                    Sign Up Now
                    <ArrowRight className="h-4 w-4 ml-2" />
                  </Button>
                </Link>
                <Link href="/auth/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 border-primary/20 hover:bg-primary/5 font-medium"
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
                    Pricing
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

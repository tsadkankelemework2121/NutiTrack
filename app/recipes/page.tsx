"use client"

import { useState, useMemo } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Search, Utensils, Clock, Heart, X } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { recipes, type Recipe } from "@/lib/recipes"
import { BarChart3, Droplets, User } from "lucide-react"

export default function RecipesPage() {
  const { user } = useAuth()
  const pathname = usePathname()
  const [searchIngredients, setSearchIngredients] = useState("")
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  // Filter recipes based on search ingredients
  const filteredRecipes = useMemo(() => {
    if (!searchIngredients.trim()) {
      return recipes
    }

    const searchTerms = searchIngredients
      .toLowerCase()
      .split(",")
      .map((term) => term.trim())
      .filter((term) => term.length > 0)

    if (searchTerms.length === 0) {
      return recipes
    }

    return recipes.filter((recipe) => {
      // Check if any of the search terms match any main ingredient
      return searchTerms.some((term) =>
        recipe.mainIngredients.some((ingredient) =>
          ingredient.toLowerCase().includes(term)
        )
      )
    })
  }, [searchIngredients])

  const handleRecipeClick = (recipe: Recipe) => {
    setSelectedRecipe(recipe)
    setIsDialogOpen(true)
  }

  const getImagePath = (imageName: string) => {
    return `/${imageName}.png`
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
              href="/recipes"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/recipes"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <Utensils className="h-5 w-5" />
              <span>Recipes</span>
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
            <Link
              href="/profile"
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                pathname === "/profile"
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              }`}
            >
              <User className="h-5 w-5" />
              <span>Profile</span>
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
          <div className="container flex h-16 items-center px-6">
            <h1 className="text-2xl font-bold">Eat Smart With What You Already Have</h1>
          </div>
        </div>

        <div className="flex-1 container px-6 py-8">
          {/* Search Section */}
          <Card className="mb-8 border-none shadow-md">
            <CardHeader>
              <CardTitle className="text-xl">Search Recipes by Ingredients</CardTitle>
              <CardDescription>
                Enter the main ingredients you have at home (e.g., rice, eggs, tomato, chicken, avocado, pasta, potato)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Type ingredients separated by commas (e.g., rice, eggs, tomato)"
                  value={searchIngredients}
                  onChange={(e) => setSearchIngredients(e.target.value)}
                  className="pl-10 h-12 text-lg"
                />
                {searchIngredients && (
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                    onClick={() => setSearchIngredients("")}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                )}
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                {filteredRecipes.length} recipe{filteredRecipes.length !== 1 ? "s" : ""} found
              </p>
            </CardContent>
          </Card>

          {/* Recipes Grid */}
          {filteredRecipes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRecipes.map((recipe) => (
                <Card
                  key={recipe.id}
                  className="overflow-hidden border-none shadow-md hover:shadow-lg transition-shadow cursor-pointer group"
                  onClick={() => handleRecipeClick(recipe)}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={getImagePath(recipe.image)}
                      alt={recipe.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <CardHeader>
                    <CardTitle className="text-lg">{recipe.name}</CardTitle>
                    <CardDescription className="line-clamp-2">
                      {recipe.shortDescription}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      {recipe.mainIngredients.map((ingredient, index) => (
                        <span
                          key={index}
                          className="px-2 py-1 text-xs bg-primary/10 text-primary rounded-full"
                        >
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-none shadow-md">
              <CardContent className="flex flex-col items-center justify-center py-16">
                <Utensils className="h-16 w-16 text-muted-foreground mb-4" />
                <h3 className="text-xl font-semibold mb-2">No healthy meals found</h3>
                <p className="text-muted-foreground text-center max-w-md">
                  Try different ingredients! Make sure to enter main ingredients like rice, eggs, tomato, chicken, avocado, pasta, or potato.
                </p>
              </CardContent>
            </Card>
          )}

          {/* Recipe Detail Dialog */}
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
              {selectedRecipe && (
                <>
                  <DialogHeader>
                    <DialogTitle className="text-2xl">{selectedRecipe.name}</DialogTitle>
                    <DialogDescription className="text-base">
                      {selectedRecipe.shortDescription}
                    </DialogDescription>
                  </DialogHeader>

                  <div className="space-y-6">
                    {/* Image */}
                    <div className="relative h-64 w-full overflow-hidden rounded-lg">
                      <img
                        src={getImagePath(selectedRecipe.image)}
                        alt={selectedRecipe.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    {/* Main Ingredients */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Utensils className="h-5 w-5" />
                        Main Ingredients
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {selectedRecipe.mainIngredients.map((ingredient, index) => (
                          <span
                            key={index}
                            className="px-3 py-1.5 bg-primary/10 text-primary rounded-full font-medium"
                          >
                            {ingredient}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Full Ingredients */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3">Full Ingredients</h3>
                      <ul className="space-y-2">
                        {selectedRecipe.fullIngredients.map((ingredient, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-primary mt-1.5">•</span>
                            <span>{ingredient}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Preparation Steps */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Clock className="h-5 w-5" />
                        Preparation Steps
                      </h3>
                      <ol className="space-y-3">
                        {selectedRecipe.preparationSteps.map((step, index) => (
                          <li key={index} className="flex gap-3">
                            <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary flex items-center justify-center font-semibold text-sm">
                              {index + 1}
                            </span>
                            <span className="flex-1">{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>

                    {/* Health Benefits */}
                    <div>
                      <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                        <Heart className="h-5 w-5 text-red-500" />
                        Health Benefits
                      </h3>
                      <ul className="space-y-2">
                        {selectedRecipe.healthBenefits.map((benefit, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <span className="text-red-500 mt-1.5">•</span>
                            <span>{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </>
              )}
            </DialogContent>
          </Dialog>
        </div>
      </div>
    </div>
  )
}


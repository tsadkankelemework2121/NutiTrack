// Macronutrient calorie values
const PROTEIN_CALORIES_PER_GRAM = 4
const CARBS_CALORIES_PER_GRAM = 4
const FAT_CALORIES_PER_GRAM = 9

// Recommended daily intake percentages
const RECOMMENDED_MACRO_PERCENTAGES = {
  protein: { min: 10, target: 20, max: 35 },
  carbs: { min: 45, target: 50, max: 65 },
  fat: { min: 20, target: 30, max: 35 },
}

// Daily micronutrient recommendations (simplified)
export const DAILY_MICRONUTRIENT_TARGETS = {
  vitaminA: { value: 900, unit: "mcg" },
  vitaminC: { value: 90, unit: "mg" },
  vitaminD: { value: 15, unit: "mcg" },
  vitaminE: { value: 15, unit: "mg" },
  calcium: { value: 1000, unit: "mg" },
  iron: { value: 8, unit: "mg" },
  potassium: { value: 3400, unit: "mg" },
  magnesium: { value: 400, unit: "mg" },
  zinc: { value: 11, unit: "mg" },
  fiber: { value: 30, unit: "g" },
}

/**
 * Calculate macronutrient distribution based on total calories
 * @param totalCalories - Total daily calories
 * @param goal - Weight goal ('lose', 'maintain', or 'gain')
 * @returns Recommended macronutrient amounts in grams
 */
export function calculateMacroTargets(totalCalories: number, goal: "lose" | "maintain" | "gain") {
  // Adjust macro percentages based on goal
  let proteinPercentage = RECOMMENDED_MACRO_PERCENTAGES.protein.target
  let carbsPercentage = RECOMMENDED_MACRO_PERCENTAGES.carbs.target
  let fatPercentage = RECOMMENDED_MACRO_PERCENTAGES.fat.target

  switch (goal) {
    case "lose":
      // Higher protein, lower carbs for weight loss
      proteinPercentage = 30
      carbsPercentage = 40
      fatPercentage = 30
      break
    case "gain":
      // Higher carbs for muscle gain
      proteinPercentage = 25
      carbsPercentage = 55
      fatPercentage = 20
      break
  }

  // Calculate calories for each macro
  const proteinCalories = totalCalories * (proteinPercentage / 100)
  const carbsCalories = totalCalories * (carbsPercentage / 100)
  const fatCalories = totalCalories * (fatPercentage / 100)

  // Convert calories to grams
  return {
    protein: Math.round(proteinCalories / PROTEIN_CALORIES_PER_GRAM),
    carbs: Math.round(carbsCalories / CARBS_CALORIES_PER_GRAM),
    fat: Math.round(fatCalories / FAT_CALORIES_PER_GRAM),
  }
}

/**
 * Calculate macronutrient percentages from actual intake
 * @param meals - Array of meal objects with nutrition data
 * @returns Macronutrient breakdown with grams and percentages
 */
export function calculateMacroPercentages(meals: any[]) {
  let totalCalories = 0
  let totalProtein = 0
  let totalCarbs = 0
  let totalFat = 0

  meals.forEach((meal) => {
    totalCalories += meal.calories || 0
    totalProtein += meal.protein || 0
    totalCarbs += meal.carbs || 0
    totalFat += meal.fat || 0
  })

  // Calculate calories from each macro
  const proteinCalories = totalProtein * PROTEIN_CALORIES_PER_GRAM
  const carbCalories = totalCarbs * CARBS_CALORIES_PER_GRAM
  const fatCalories = totalFat * FAT_CALORIES_PER_GRAM

  // Calculate percentages
  const proteinPercentage = totalCalories > 0 ? Math.round((proteinCalories / totalCalories) * 100) : 0
  const carbPercentage = totalCalories > 0 ? Math.round((carbCalories / totalCalories) * 100) : 0
  const fatPercentage = totalCalories > 0 ? Math.round((fatCalories / totalCalories) * 100) : 0

  return {
    protein: { grams: totalProtein, percentage: proteinPercentage },
    carbs: { grams: totalCarbs, percentage: carbPercentage },
    fat: { grams: totalFat, percentage: fatPercentage },
  }
}

/**
 * Estimate micronutrients based on meals
 * @param meals - Array of meal objects
 * @returns Array of micronutrient objects with values and targets
 */
export function estimateMicronutrients(meals: any[]) {
  // In a real app, this would use a food database with detailed nutrition data
  // For now, we'll return estimated values based on meal types and calories

  // Default micronutrient values (percentage of daily targets)
  const defaultMicronutrients = [
    { name: "Vitamin A", value: 0, target: 100, unit: "%" },
    { name: "Vitamin C", value: 0, target: 100, unit: "%" },
    { name: "Vitamin D", value: 0, target: 100, unit: "%" },
    { name: "Calcium", value: 0, target: 100, unit: "%" },
    { name: "Iron", value: 0, target: 100, unit: "%" },
    { name: "Potassium", value: 0, target: 100, unit: "%" },
    { name: "Fiber", value: 0, target: 100, unit: "%" },
  ]

  // Simple estimation logic based on meal names and types
  meals.forEach((meal) => {
    const mealName = meal.name?.toLowerCase() || ""

    // Estimate vitamin A
    if (mealName.includes("carrot") || mealName.includes("sweet potato") || mealName.includes("spinach")) {
      defaultMicronutrients[0].value += 25
    }

    // Estimate vitamin C
    if (mealName.includes("orange") || mealName.includes("berry") || mealName.includes("pepper")) {
      defaultMicronutrients[1].value += 20
    }

    // Estimate vitamin D
    if (mealName.includes("salmon") || mealName.includes("egg") || mealName.includes("mushroom")) {
      defaultMicronutrients[2].value += 15
    }

    // Estimate calcium
    if (mealName.includes("milk") || mealName.includes("yogurt") || mealName.includes("cheese")) {
      defaultMicronutrients[3].value += 20
    }

    // Estimate iron
    if (mealName.includes("beef") || mealName.includes("spinach") || mealName.includes("lentil")) {
      defaultMicronutrients[4].value += 15
    }

    // Estimate potassium
    if (mealName.includes("banana") || mealName.includes("potato") || mealName.includes("avocado")) {
      defaultMicronutrients[5].value += 15
    }

    // Estimate fiber
    if (mealName.includes("oat") || mealName.includes("bean") || mealName.includes("fruit")) {
      defaultMicronutrients[6].value += 20
    }
  })

  // Cap values at 100%
  defaultMicronutrients.forEach((nutrient) => {
    nutrient.value = Math.min(nutrient.value, 100)
  })

  return defaultMicronutrients
}

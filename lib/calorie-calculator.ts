type Sex = "male" | "female"
type ActivityLevel = "sedentary" | "light" | "moderate" | "active" | "very_active"
type Goal = "lose" | "maintain" | "gain"

// Mifflin-St Jeor formula for calculating Basal Metabolic Rate (BMR)
export function calculateBMR(weight: number, height: number, age: number, sex: Sex): number {
  if (sex === "male") {
    return 10 * weight + 6.25 * height - 5 * age + 5
  } else {
    return 10 * weight + 6.25 * height - 5 * age - 161
  }
}

// Activity multipliers
const activityMultipliers: Record<ActivityLevel, number> = {
  sedentary: 1.2, // Little or no exercise
  light: 1.375, // Light exercise 1-3 days/week
  moderate: 1.55, // Moderate exercise 3-5 days/week
  active: 1.725, // Hard exercise 6-7 days/week
  very_active: 1.9, // Very hard exercise & physical job or 2x training
}

// Goal adjustments (in percentage)
const goalAdjustments: Record<Goal, number> = {
  lose: -20, // 20% calorie deficit
  maintain: 0, // No adjustment
  gain: 15, // 15% calorie surplus
}

// Calculate Total Daily Energy Expenditure (TDEE)
export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  return bmr * activityMultipliers[activityLevel]
}

// Calculate daily calorie target based on BMR, activity level, and goal
export function calculateDailyCalorieTarget(
  weight: number,
  height: number,
  age: number,
  sex: Sex,
  activityLevel: ActivityLevel,
  goal: Goal,
): number {
  const bmr = calculateBMR(weight, height, age, sex)
  const tdee = calculateTDEE(bmr, activityLevel)
  const adjustment = tdee * (goalAdjustments[goal] / 100)

  return Math.round(tdee + adjustment)
}

// Recommend water intake based on weight (in liters)
export function recommendWaterIntake(weight: number): number {
  // General recommendation: 30-35 ml per kg of body weight
  return Math.round(((weight * 33) / 1000) * 10) / 10
}

// Recommend protein intake based on weight and goal (in grams)
export function recommendProteinIntake(weight: number, goal: Goal): number {
  // Protein recommendations in g/kg of body weight
  const proteinMultipliers: Record<Goal, number> = {
    lose: 2.0, // Higher protein for preserving muscle during weight loss
    maintain: 1.6,
    gain: 1.8, // Higher protein for muscle building
  }

  return Math.round(weight * proteinMultipliers[goal])
}

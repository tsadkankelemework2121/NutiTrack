// Calories burned per minute for different exercises (for a 70kg person)
const CALORIES_PER_MINUTE: Record<string, number> = {
  walking: 4.5, // Walking at moderate pace (4.5 km/h)
  running: 10, // Running at moderate pace (8 km/h)
  cycling: 8, // Cycling at moderate pace (15 km/h)
  swimming: 9, // Swimming at moderate pace
  yoga: 3, // Yoga
  weightlifting: 5, // Weight training
  hiit: 12, // High-intensity interval training
  dancing: 6, // Dancing
}

/**
 * Calculate the time needed to burn a specific amount of calories
 * @param calories - The number of calories to burn
 * @param exerciseType - The type of exercise
 * @param weight - The person's weight in kg (default: 70kg)
 * @returns The time in minutes needed to burn the calories
 */
export function calculateExerciseTime(calories: number, exerciseType: string, weight = 70): number {
  if (calories <= 0) return 0

  // Get the base calorie burn rate for the exercise
  const baseCaloriesPerMinute = CALORIES_PER_MINUTE[exerciseType] || CALORIES_PER_MINUTE.walking

  // Adjust for weight (calories burned scales roughly linearly with weight)
  const adjustedCaloriesPerMinute = baseCaloriesPerMinute * (weight / 70)

  // Calculate and round to the nearest minute
  return Math.round(calories / adjustedCaloriesPerMinute)
}

/**
 * Calculate the calories burned during an exercise
 * @param minutes - The duration of exercise in minutes
 * @param exerciseType - The type of exercise
 * @param weight - The person's weight in kg (default: 70kg)
 * @returns The calories burned
 */
export function calculateCaloriesBurned(minutes: number, exerciseType: string, weight = 70): number {
  if (minutes <= 0) return 0

  // Get the base calorie burn rate for the exercise
  const baseCaloriesPerMinute = CALORIES_PER_MINUTE[exerciseType] || CALORIES_PER_MINUTE.walking

  // Adjust for weight
  const adjustedCaloriesPerMinute = baseCaloriesPerMinute * (weight / 70)

  // Calculate and round to the nearest calorie
  return Math.round(adjustedCaloriesPerMinute * minutes)
}

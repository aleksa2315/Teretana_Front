
export interface MealPlan {
  id?: number;
  name: string;
  dishes: { id: number }[];  // Ensure dishes have an `id` property
}


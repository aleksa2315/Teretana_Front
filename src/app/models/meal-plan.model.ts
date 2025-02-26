import { Dish } from './dish.model';

export interface MealPlan {
  id?: number;
  name: string;
  dishes: Dish[];
}

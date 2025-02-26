import { DishIngredient } from './dish-ingredient.model';

export interface Dish {
  id?: number;
  name: string;
  ingredients: DishIngredient[];
}

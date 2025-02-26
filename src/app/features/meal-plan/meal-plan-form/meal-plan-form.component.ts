import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MealPlan } from 'src/app/models/meal-plan.model';
import { MealPlanService } from 'src/app/services/meal-plan.service';
import { DishService } from 'src/app/services/dish.service';
import { Dish } from 'src/app/models/dish.model';

@Component({
  selector: 'app-meal-plan-form',
  templateUrl: './meal-plan-form.component.html'
})
export class MealPlanFormComponent implements OnInit {
  mealPlan: MealPlan = { name: '', dishes: [] };
  isEditMode = false;
  allDishes: Dish[] = [];

  constructor(
    private mealPlanService: MealPlanService,
    private dishService: DishService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadDishes();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.mealPlanService.getById(+id).subscribe(data => {
        this.mealPlan = data;
      });
    }
  }

  loadDishes() {
    this.dishService.getAll().subscribe(data => {
      this.allDishes = data;
    });
  }

  saveMealPlan() {
    if (this.isEditMode) {
      this.mealPlanService.update(this.mealPlan.id!, this.mealPlan).subscribe(() => {
        this.router.navigate(['/meal-plan']);
      });
    } else {
      this.mealPlanService.create(this.mealPlan).subscribe(() => {
        this.router.navigate(['/meal-plan']);
      });
    }
  }

  toggleDishSelection(dish: Dish) {
    const index = this.mealPlan.dishes.findIndex(d => d.id === dish.id);
    if (index >= 0) {
      this.mealPlan.dishes.splice(index, 1);
    } else {
      this.mealPlan.dishes.push(dish);
    }
  }

  isDishSelected(dish: Dish): boolean {
    return this.mealPlan.dishes.some(d => d.id === dish.id);
  }
}

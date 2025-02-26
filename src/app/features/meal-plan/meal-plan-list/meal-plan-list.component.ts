import { Component, OnInit } from '@angular/core';
import { MealPlan } from 'src/app/models/meal-plan.model';
import { MealPlanService } from 'src/app/services/meal-plan.service';

@Component({
  selector: 'app-meal-plan-list',
  templateUrl: './meal-plan-list.component.html'
})
export class MealPlanListComponent implements OnInit {
  mealPlans: MealPlan[] = [];

  constructor(private mealPlanService: MealPlanService) {}

  ngOnInit(): void {
    this.loadMealPlans();
  }

  loadMealPlans() {
    this.mealPlanService.getAll().subscribe(data => {
      this.mealPlans = data;
    });
  }

  deleteMealPlan(id: number) {
    this.mealPlanService.delete(id).subscribe(() => {
      this.loadMealPlans();
    });
  }
}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MealPlanListComponent } from './meal-plan-list/meal-plan-list.component';
import { MealPlanFormComponent } from './meal-plan-form/meal-plan-form.component';

const routes: Routes = [
  { path: '', component: MealPlanListComponent },
  { path: 'create', component: MealPlanFormComponent },
  { path: ':id', component: MealPlanFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MealPlanRoutingModule { }

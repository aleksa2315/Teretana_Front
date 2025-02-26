import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealPlanRoutingModule } from './meal-plan-routing.module';
import { MealPlanComponent } from './meal-plan.component';
import { MealPlanListComponent } from './meal-plan-list/meal-plan-list.component';
import { MealPlanDetailsComponent } from './meal-plan-details/meal-plan-details.component';
import { MealPlanFormComponent } from './meal-plan-form/meal-plan-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    MealPlanComponent,
    MealPlanListComponent,
    MealPlanDetailsComponent,
    MealPlanFormComponent
  ],
    imports: [
        CommonModule,
        MealPlanRoutingModule,
        FormsModule
    ]
})
export class MealPlanModule { }

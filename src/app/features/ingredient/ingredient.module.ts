import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IngredientRoutingModule } from './ingredient-routing.module';
import { IngredientComponent } from './ingredient.component';
import { IngredientListComponent } from './ingredient-list/ingredient-list.component';
import { IngredientFormComponent } from './ingredient-form/ingredient-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    IngredientComponent,
    IngredientListComponent,
    IngredientFormComponent
  ],
  imports: [
    CommonModule,
    IngredientRoutingModule,
    FormsModule
  ]
})
export class IngredientModule { }

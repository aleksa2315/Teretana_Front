import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DishRoutingModule } from './dish-routing.module';
import { DishComponent } from './dish.component';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishDetailsComponent } from './dish-details/dish-details.component';
import { DishFormComponent } from './dish-form/dish-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DishComponent,
    DishListComponent,
    DishDetailsComponent,
    DishFormComponent
  ],
    imports: [
        CommonModule,
        DishRoutingModule,
        FormsModule
    ]
})
export class DishModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DishListComponent } from './dish-list/dish-list.component';
import { DishFormComponent } from './dish-form/dish-form.component';

const routes: Routes = [
  { path: '', component: DishListComponent },
  { path: 'create', component: DishFormComponent },
  { path: ':id', component: DishFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DishRoutingModule { }

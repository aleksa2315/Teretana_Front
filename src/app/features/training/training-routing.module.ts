import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingFormComponent } from './training-form/training-form.component';

const routes: Routes = [
  { path: '', component: TrainingListComponent },
  { path: 'create', component: TrainingFormComponent },
  { path: ':id', component: TrainingFormComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainingRoutingModule { }

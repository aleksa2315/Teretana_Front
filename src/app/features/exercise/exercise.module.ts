import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExerciseRoutingModule } from './exercise-routing.module';
import { ExerciseComponent } from './exercise.component';
import { ExerciseListComponent } from './exercise-list/exercise-list.component';
import { ExerciseDetailsComponent } from './exercise-details/exercise-details.component';
import { ExerciseFormComponent } from './exercise-form/exercise-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ExerciseComponent,
    ExerciseListComponent,
    ExerciseDetailsComponent,
    ExerciseFormComponent
  ],
    imports: [
        CommonModule,
        ExerciseRoutingModule,
        FormsModule
    ]
})
export class ExerciseModule { }

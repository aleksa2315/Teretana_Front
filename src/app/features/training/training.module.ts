import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TrainingRoutingModule } from './training-routing.module';
import { TrainingComponent } from './training.component';
import { TrainingListComponent } from './training-list/training-list.component';
import { TrainingDetailsComponent } from './training-details/training-details.component';
import { TrainingFormComponent } from './training-form/training-form.component';
import {FormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    TrainingComponent,
    TrainingListComponent,
    TrainingDetailsComponent,
    TrainingFormComponent
  ],
    imports: [
        CommonModule,
        TrainingRoutingModule,
        FormsModule
    ]
})
export class TrainingModule { }

import { Component, OnInit } from '@angular/core';
import { Training } from 'src/app/models/training.model';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html'
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getAll().subscribe(data => {
      this.trainings = data;
    });
  }

  deleteTraining(id: number) {
    this.trainingService.delete(id).subscribe(() => {
      this.loadTrainings();
    });
  }
}

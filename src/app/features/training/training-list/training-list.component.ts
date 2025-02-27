import { Component, OnInit } from '@angular/core';
import { TrainingService } from 'src/app/services/training.service';
import { Training } from 'src/app/models/training.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-training-list',
  templateUrl: './training-list.component.html'
})
export class TrainingListComponent implements OnInit {
  trainings: Training[] = [];

  constructor(private trainingService: TrainingService, private router: Router) {}

  ngOnInit(): void {
    this.loadTrainings();
  }

  loadTrainings() {
    this.trainingService.getAll().subscribe(data => {
      this.trainings = data;
    });
  }

  deleteTraining(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj trening?')) {
      this.trainingService.delete(id).subscribe(() => {
        this.loadTrainings();
      });
    }
  }

  addTraining() {
    this.router.navigate(['/training/create']);
  }

  editTraining(id: number) {
    this.router.navigate(['/training', id]);
  }
}

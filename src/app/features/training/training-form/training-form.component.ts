import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/models/training.model';
import { TrainingService } from 'src/app/services/training.service';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html'
})
export class TrainingFormComponent implements OnInit {
  training: Training = { name: '', estimatedDuration: '', exercises: [] };
  isEditMode = false;

  constructor(
    private trainingService: TrainingService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.trainingService.getById(+id).subscribe(data => {
        this.training = data;
      });
    }
  }

  saveTraining() {
    if (this.isEditMode) {
      this.trainingService.update(this.training.id!, this.training).subscribe(() => {
        this.router.navigate(['/training']);
      });
    } else {
      this.trainingService.create(this.training).subscribe(() => {
        this.router.navigate(['/training']);
      });
    }
  }
}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-form',
  templateUrl: './exercise-form.component.html'
})
export class ExerciseFormComponent implements OnInit {
  exercise: Exercise = { name: '', sets: 0, repetitions: 0 };
  isEditMode = false;

  constructor(
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.exerciseService.getById(+id).subscribe(data => {
        this.exercise = data;
      });
    }
  }

  saveExercise() {
    if (this.isEditMode) {
      this.exerciseService.update(this.exercise.id!, this.exercise).subscribe(() => {
        this.router.navigate(['/exercise']);
      });
    } else {
      this.exerciseService.create(this.exercise).subscribe(() => {
        this.router.navigate(['/exercise']);
      });
    }
  }
}

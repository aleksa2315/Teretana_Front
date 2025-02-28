import { Component, OnInit } from '@angular/core';
import { Exercise } from 'src/app/models/exercise.model';
import { ExerciseService } from 'src/app/services/exercise.service';

@Component({
  selector: 'app-exercise-list',
  templateUrl: './exercise-list.component.html'
})
export class ExerciseListComponent implements OnInit {
  exercises: Exercise[] = [];

  constructor(private exerciseService: ExerciseService) {}

  ngOnInit(): void {
    this.loadExercises();
  }

  loadExercises() {
    this.exerciseService.getAll(0, 100, '').subscribe(data => {
      this.exercises = data.content;
    });
  }

  deleteExercise(id: number) {
    this.exerciseService.delete(id).subscribe(() => {
      this.loadExercises();
    });
  }
}

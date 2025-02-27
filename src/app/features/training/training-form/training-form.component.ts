import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/models/training.model';
import { TrainingService } from 'src/app/services/training.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html'
})
export class TrainingFormComponent implements OnInit {
  training: Training = { name: '', description: '', trainingExercises: [] };
  isEditMode = false;

  availableExercises: Exercise[] = [];
  searchTermEx: string = '';
  currentPageEx: number = 0;
  pageSizeEx: number = 10;

  // Za čuvanje broja serija i ponavljanja po vežbi
  exerciseData: { [key: number]: { sets: number; reps: number } } = {};

  constructor(
    private trainingService: TrainingService,
    private exerciseService: ExerciseService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadExercises();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.trainingService.getById(+id).subscribe(data => {
        this.training = data;
        this.training.trainingExercises.forEach(te => {
          // Inicijalizuj exerciseData sa postojećim vrednostima
          this.exerciseData[te.exerciseId] = { sets: te.sets, reps: te.reps };
        });
      });
    }
  }

  loadExercises() {
    this.exerciseService.getAll(this.currentPageEx, this.pageSizeEx, this.searchTermEx)
      .subscribe(data => {
        this.availableExercises = data.content;
        // Inicijalizuj exerciseData za svaku vežbu ako već nije postavljeno
        this.availableExercises.forEach(e => {
          if (e.id !== undefined && !this.exerciseData[e.id]) {
            this.exerciseData[e.id] = { sets: 0, reps: 0 };
          }
        });
      });
  }

  searchExercises() {
    this.currentPageEx = 0;
    this.loadExercises();
  }

  goToExercisePage(page: number) {
    if (page >= 0) {
      this.currentPageEx = page;
      this.loadExercises();
    }
  }

  saveTraining() {
    // Formiraj niz trainingExercises iz exerciseData
    this.training.trainingExercises = Object.keys(this.exerciseData)
      .filter(id => this.exerciseData[+id].sets > 0 && this.exerciseData[+id].reps > 0)
      .map(id => ({
        exerciseId: +id,
        exerciseName: this.availableExercises.find(e => e.id === +id)?.name || '',
        sets: this.exerciseData[+id].sets,
        reps: this.exerciseData[+id].reps
      }));

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

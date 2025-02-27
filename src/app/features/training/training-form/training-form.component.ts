import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Training } from 'src/app/models/training.model';
import { TrainingService } from 'src/app/services/training.service';
import { ExerciseService } from 'src/app/services/exercise.service';
import { Exercise } from 'src/app/models/exercise.model';
import { TrainingExercise } from 'src/app/models/training-exercise.model';

@Component({
  selector: 'app-training-form',
  templateUrl: './training-form.component.html'
})
export class TrainingFormComponent implements OnInit {
  training: Training = { name: '', description: '', trainingExercises: [] };
  isEditMode = false;

  // Vežbe dostupne za odabir sa pretragom i paginacijom
  availableExercises: Exercise[] = [];
  searchTermEx: string = '';
  currentPageEx: number = 0;
  pageSizeEx: number = 10;

  // Podaci o vežbama: za svaku vežbu čuvamo broj serija i ponavljanja
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
          this.exerciseData[te.exerciseId] = { sets: te.sets, reps: te.reps };
        });
      });
    }
  }

  // Učitava dostupne vežbe koristeći paginaciju i pretragu
  loadExercises() {
    this.exerciseService.getAll(this.currentPageEx, this.pageSizeEx, this.searchTermEx)
      .subscribe(data => {
        this.availableExercises = data.content; // 'content' je niz vežbi
      });
  }

  // Pretraga vežbi – resetuje se trenutna stranica
  searchExercises() {
    this.currentPageEx = 0;
    this.loadExercises();
  }

  // Promena stranice vežbi
  goToExercisePage(page: number) {
    if (page >= 0) {
      this.currentPageEx = page;
      this.loadExercises();
    }
  }

  saveTraining() {
    // Formiraj listu trainingExercises iz exerciseData
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

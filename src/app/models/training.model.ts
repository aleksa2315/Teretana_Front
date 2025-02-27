import { TrainingExercise } from './training-exercise.model';

export interface Training {
  id?: number;
  name: string;
  description: string;
  trainingExercises: TrainingExercise[];
}

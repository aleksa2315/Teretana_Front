import { Exercise } from './exercise.model';

export interface Training {
  id?: number;
  name: string;
  estimatedDuration: string;
  exercises: Exercise[];
}

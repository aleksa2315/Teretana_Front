import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Training } from '../models/training.model';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {
  private baseUrl = 'https://teretana-back.onrender.com/api/trainings';

  constructor(private http: HttpClient) {}

  getAll(): Observable<Training[]> {
    return this.http.get<Training[]>(this.baseUrl);
  }

  getById(id: number): Observable<Training> {
    return this.http.get<Training>(`${this.baseUrl}/${id}`);
  }

  create(training: Training): Observable<Training> {
    return this.http.post<Training>(this.baseUrl, training);
  }

  update(id: number, training: Training): Observable<Training> {
    return this.http.put<Training>(`${this.baseUrl}/${id}`, training);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

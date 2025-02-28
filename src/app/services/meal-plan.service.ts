import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { MealPlan } from '../models/meal-plan.model';

@Injectable({
  providedIn: 'root'
})
export class MealPlanService {
  private baseUrl = 'https://teretanaback-production.up.railway.app/api/meal-plans';

  constructor(private http: HttpClient) {}

  getAll(): Observable<MealPlan[]> {
    return this.http.get<MealPlan[]>(this.baseUrl);
  }

  getById(id: number): Observable<MealPlan> {
    return this.http.get<MealPlan>(`${this.baseUrl}/${id}`);
  }

  create(mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.post<MealPlan>(this.baseUrl, mealPlan);
  }

  update(id: number, mealPlan: MealPlan): Observable<MealPlan> {
    return this.http.put<MealPlan>(`${this.baseUrl}/${id}`, mealPlan);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';
import {Ingredient} from "../models/ingredient.model";

@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  private apiUrl = 'https://teretanaback-production.up.railway.app/api/ingredients';

  constructor(private http: HttpClient) { }

  getAll(page: number = 0, size: number = 10, search: string = ''): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString())
      .set('search', search);

    return this.http.get<any>(this.apiUrl, { params });
  }

  getById(id: number): Observable<Ingredient> {
    return this.http.get<Ingredient>(`${this.apiUrl}/${id}`);
  }

  create(ingredient: Ingredient): Observable<Ingredient> {
  const token = localStorage.getItem('token');  // Uveri se da token postoji
  const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

  return this.http.post<Ingredient>(this.apiUrl, ingredient, { headers });
}

  update(id: number, ingredient: Ingredient): Observable<Ingredient> {
    return this.http.put<Ingredient>(`${this.apiUrl}/${id}`, ingredient);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}

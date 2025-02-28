import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Ingredient } from '../../../models/ingredient.model';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html',
})
export class IngredientListComponent implements OnInit {
  ingredients: Ingredient[] = [];
  searchTerm: string = '';

  constructor(private ingredientService: IngredientService, private router: Router) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.getAll(0, 10, this.searchTerm).subscribe((data) => {
      this.ingredients = data.content;
    });
  }


  deleteIngredient(id?: number) {
  if (id === undefined) return; // Ako je undefined, ne radi ništa
  if (confirm('Da li ste sigurni da želite da obrišete ovaj sastojak?')) {
    this.ingredientService.delete(id).subscribe(() => {
      this.loadIngredients();
    });
  }
}

editIngredient(id?: number) {
  if (id === undefined) return; // Ako je undefined, ne radi ništa
  this.router.navigate(['/ingredient', id]);
}

  addIngredient() {
    this.router.navigate(['/ingredient/create']);
  }
}

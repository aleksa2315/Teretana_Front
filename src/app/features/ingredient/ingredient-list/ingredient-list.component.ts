import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {Ingredient} from "../../../models/ingredient.model";
import {IngredientService} from "../../../services/ingredient.service";

@Component({
  selector: 'app-ingredient-list',
  templateUrl: './ingredient-list.component.html'
})
export class IngredientListComponent implements OnInit {
  ingredients: Ingredient[] = [];

  constructor(private ingredientService: IngredientService, private router: Router) {}

  ngOnInit(): void {
    this.loadIngredients();
  }

  loadIngredients() {
    this.ingredientService.getAll().subscribe(data => {
      this.ingredients = data;
    });
  }

  deleteIngredient(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovaj sastojak?')) {
      this.ingredientService.delete(id).subscribe(() => {
        this.loadIngredients();
      });
    }
  }

  addIngredient() {
    this.router.navigate(['/ingredient/create']);
  }

  editIngredient(id: number) {
    this.router.navigate(['/ingredient', id]);
  }
}

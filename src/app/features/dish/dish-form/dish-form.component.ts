import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';
import { IngredientService } from 'src/app/services/ingredient.service';
import { Ingredient } from 'src/app/models/ingredient.model';

@Component({
  selector: 'app-dish-form',
  templateUrl: './dish-form.component.html'
})
export class DishFormComponent implements OnInit {
  dish: Dish = { name: '', ingredients: [] };
  isEditMode = false;

  // Sastojci
  availableIngredients: Ingredient[] = [];
  ingredientWeights: { [key: number]: number } = {};

  // Pretraga i paginacija
  searchTerm: string = '';
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private dishService: DishService,
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadIngredients();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.dishService.getById(+id).subscribe(data => {
        this.dish = data;
        this.dish.ingredients.forEach(ing => {
          this.ingredientWeights[ing.ingredientId] = ing.weight;
        });
      });
    }
  }

  // Učitavanje sastojaka sa pretragom i paginacijom
  loadIngredients() {
    this.ingredientService.getAll(this.currentPage, this.pageSize, this.searchTerm).subscribe(data => {
      this.availableIngredients = data.content;
    });
  }

  // Pretraga sastojaka
  searchIngredients() {
    this.currentPage = 0;
    this.loadIngredients();
  }

  // Navigacija kroz stranice
  goToPage(page: number) {
    if (page >= 0) {
      this.currentPage = page;
      this.loadIngredients();
    }
  }

  // Dodavanje sastojaka u jelo
  addIngredient(ingredient: Ingredient) {
    this.ingredientWeights[ingredient.id] = this.ingredientWeights[ingredient.id] || 100;
  }

  // Uklanjanje sastojaka iz jela
  removeIngredient(ingredientId: number) {
    delete this.ingredientWeights[ingredientId];
  }

  // Čuvanje jela
  saveDish() {
    this.dish.ingredients = Object.keys(this.ingredientWeights)
      .filter(id => this.ingredientWeights[+id] > 0)
      .map(id => ({
        ingredientId: +id,
        ingredientName: this.availableIngredients.find(ing => ing.id === +id)?.name || '',
        weight: this.ingredientWeights[+id]
      }));

    if (this.isEditMode) {
      this.dishService.update(this.dish.id!, this.dish).subscribe(() => {
        this.router.navigate(['/dish']);
      });
    } else {
      this.dishService.create(this.dish).subscribe(() => {
        this.router.navigate(['/dish']);
      });
    }
  }
}

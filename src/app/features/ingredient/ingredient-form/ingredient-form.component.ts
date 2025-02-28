import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ingredient } from '../../../models/ingredient.model';
import { IngredientService } from '../../../services/ingredient.service';

@Component({
  selector: 'app-ingredient-form',
  templateUrl: './ingredient-form.component.html',
})
export class IngredientFormComponent implements OnInit {
  ingredient: Ingredient = { id: 0, name: '' };
  isEditMode = false;

  constructor(
    private ingredientService: IngredientService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.ingredientService.getById(+id).subscribe((data) => {
        this.ingredient = data;
      });
    }
  }

  saveIngredient() {
    const saveOperation = this.isEditMode
      ? this.ingredientService.update(this.ingredient.id!, this.ingredient)
      : this.ingredientService.create(this.ingredient);

    saveOperation.subscribe(() => this.router.navigate(['/ingredient']));
  }
}

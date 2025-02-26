import { Component, OnInit } from '@angular/core';
import { Dish } from 'src/app/models/dish.model';
import { DishService } from 'src/app/services/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html'
})
export class DishListComponent implements OnInit {
  dishes: Dish[] = [];

  constructor(private dishService: DishService) {}

  ngOnInit(): void {
    this.loadDishes();
  }

  loadDishes() {
    this.dishService.getAll().subscribe(data => {
      this.dishes = data;
    });
  }

  deleteDish(id: number) {
    if (confirm('Da li ste sigurni da želite da obrišete ovo jelo?')) {
      this.dishService.delete(id).subscribe(() => {
        this.loadDishes();
      });
    }
  }
}

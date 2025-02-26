import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'users',
    loadChildren: () => import('./users/users.module').then(m => m.UsersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'orders',
    loadChildren: () => import('./orders/orders.module').then(m => m.OrdersModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'error-history',
    loadChildren: () => import('./error-history/error-history.module').then(m => m.ErrorHistoryModule),
  },
 { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'training', loadChildren: () => import('./features/training/training.module').then(m => m.TrainingModule) },
  { path: 'exercise', loadChildren: () => import('./features/exercise/exercise.module').then(m => m.ExerciseModule) },
  { path: 'meal-plan', loadChildren: () => import('./features/meal-plan/meal-plan.module').then(m => m.MealPlanModule) },
  { path: 'dish', loadChildren: () => import('./features/dish/dish.module').then(m => m.DishModule) },
  { path: 'ingredient', loadChildren: () => import('./features/ingredient/ingredient.module').then(m => m.IngredientModule) }
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}

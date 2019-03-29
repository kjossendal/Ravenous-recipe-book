import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from '../recipes/recipes.component';
import { RecipeWrapperComponent } from '../recipes/recipe-wrapper/recipe-wrapper.component';
import { RecipeDetailComponent } from '../recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from '../recipes/recipe-edit/recipe-edit.component';
import { AuthGuardService } from '../services/auth-guard.service';

const recipesRoutes: Routes = [
    { path: '', component: RecipesComponent, children: [
        { path: '', component: RecipeWrapperComponent },
        { path: 'create', component: RecipeEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, pathMatch: 'full', canActivate: [AuthGuardService] },
    ] },
];

@NgModule({
  imports: [RouterModule.forChild(recipesRoutes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {}
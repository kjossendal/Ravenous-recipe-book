import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipesComponent } from './recipes/recipes.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { RecipeWrapperComponent } from './recipes/recipe-wrapper/recipe-wrapper.component';
import { RecipeDetailComponent } from './recipes/recipe-detail/recipe-detail.component';
import { RecipeEditComponent } from './recipes/recipe-edit/recipe-edit.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from './services/auth.service';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'recipes', component: RecipesComponent, children: [
        { path: '', component: RecipeWrapperComponent },
        { path: 'create', component: RecipeEditComponent, pathMatch: 'full', canActivate: [AuthService] },
        { path: ':id', component: RecipeDetailComponent },
        { path: ':id/edit', component: RecipeEditComponent, pathMatch: 'full', canActivate: [AuthService] },
    ] },
    { 
        path: 'shopping_list', 
        component: ShoppingListComponent, 
        canActivate: [AuthGuardService], 
        canActivateChild: [AuthGuardService],
        // canDeactivate: [CanDeactivateGuard]
    },
    { path: 'not_found', component: PageNotFoundComponent },
    { path: '**', redirectTo: '/not_found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AuthGuardService } from './services/auth-guard.service';
import { CanDeactivateGuard } from './services/can-deactivate-guard.service';
import { HomeComponent } from './core/home/home.component';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'login', component: LoginComponent },
    { path: 'recipes', loadChildren: './recipes/recipes.module#RecipesModule' },
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
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule { }

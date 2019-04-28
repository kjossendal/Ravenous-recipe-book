import { NgModule } from '@angular/core';

import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from '../shared/shared.module';
import { AppRoutingModule } from '../app-routing.module';
import { ShoppingListService } from '../services/shoppingList.service';
import { AuthGuardService } from '../services/auth-guard.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { AuthService } from '../services/auth.service';
import { CanDeactivateGuard } from '../services/can-deactivate-guard.service';
import { RecipeService } from '../services/recipe.service';
import { UnitsService } from '../services/units.service';
import { ApiService } from '../shared/api.service';
import { FormsModule } from '@angular/forms';
import { RecipeItemCardComponent } from '../recipes/recipe-list/recipe-item-card/recipe-item-card.component';

@NgModule({
    declarations: [
        HeaderComponent,
        HomeComponent,
        RecipeItemCardComponent
    ],
    imports: [
        SharedModule,
        AppRoutingModule,
        FormsModule,
    ],
    exports: [
        AppRoutingModule,
        HeaderComponent
    ],
    providers: [
        ShoppingListService, 
        AuthGuardService, 
        AngularFireAuth,
        AuthService, 
        CanDeactivateGuard, 
        RecipeService,
        UnitsService,
        ApiService,
    ],
})
export class CoreModule {}
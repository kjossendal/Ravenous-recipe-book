import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipesComponent } from './recipes.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeWrapperComponent } from './recipe-wrapper/recipe-wrapper.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeToolbarComponent } from './recipe-toolbar/recipe-toolbar.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipesRoutingModule } from './recipes-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NgxTinymceModule } from 'ngx-tinymce';
// import { RecipeItemCardComponent } from './recipe-list/recipe-item-card/recipe-item-card.component';

@NgModule({
    declarations: [
        RecipesComponent,
        RecipeDetailComponent,
        RecipeWrapperComponent,
        RecipeEditComponent,
        RecipeItemComponent,
        RecipeToolbarComponent,
        RecipeListComponent,
        // RecipeItemCardComponent,
    ],
    imports: [
        CommonModule, // put this in every feature module, allows access to ngif ngfor and so on
        ReactiveFormsModule,
        FormsModule,
        SharedModule,
        RecipesRoutingModule,
        NgxTinymceModule.forRoot({
            // baseURL: './assets/tinymce/',
            // // or cdn
            baseURL: '//cdnjs.cloudflare.com/ajax/libs/tinymce/4.9.0/'
        })
    ]
})
export class RecipesModule { }
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    sub: Subscription;
    recipes: Recipe[];
    filterText: string = '';

    constructor(private recipeService: RecipeService) { };

    ngOnInit() {
        this.recipes = this.recipeService.getRecipes();

        this.sub = this.recipeService.recipesChanged.subscribe(
            (recipes: Recipe[]) => {
                this.recipes = recipes;
            }
        )
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

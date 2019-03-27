import { Component, OnInit, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { Subscription } from 'rxjs';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit, OnDestroy {
    sub: Subscription;
    recipes: Recipe[];
    filterText: string = '';

    constructor(private recipeService: RecipeService, private apiService: ApiService) { };

    update() {

    }

    ngOnInit() {
        this.sub = this.apiService.getRecipes().subscribe(
            (data) => {
                this.recipes = data.map(e => {
                    return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                    } as Recipe
                })
            }
        )

        // this.recipes = this.recipeService.getRecipes();

        // this.sub = this.recipeService.recipesChanged.subscribe(
        //     (recipes: Recipe[]) => {
        //         this.recipes = recipes;
        //     }
        // )
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    }
}

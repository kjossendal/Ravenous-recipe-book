import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    currentRecipe: Recipe;

    constructor(private apiService: ApiService,  private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { };

    ngOnInit() {
        this.route.params.subscribe( (params: Params) => {
            this.apiService.getRecipeById(params['id']).subscribe(
                (data) => {
                    console.log("DATA", data)
                    this.currentRecipe = {
                        id: params['id'],
                        ...data
                    } as Recipe
                }
            )
            // this.currentRecipe = this.recipeService.getRecipeById(params['id'])
        })
    }
    onAddToShoppingList() {
        this.recipeService.addIngredientsToShoppingList(this.currentRecipe.ingredients);
    };

    onEditRecipe() {
        this.router.navigate(['recipes', this.currentRecipe.id, 'edit'])
    };

    onDeleteRecipe() {
        this.recipeService.deleteRecipe(this.currentRecipe.id);
    }

};

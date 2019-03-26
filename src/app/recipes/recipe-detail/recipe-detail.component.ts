import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
    currentRecipe: Recipe;

    constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { };

    ngOnInit() {
        this.route.params.subscribe( (params: Params) => {
            this.currentRecipe = this.recipeService.getRecipeById(params['id'])
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

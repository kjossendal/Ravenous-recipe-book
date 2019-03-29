import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from 'src/app/services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    sub: Subscription;
    currentRecipe: Recipe;

    constructor(private apiService: ApiService,  private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) { };

    ngOnInit() {
        this.sub = this.route.params.subscribe( (params: Params) => {
            this.apiService.getRecipeById(params['id']).subscribe(
                (data) => {
                    this.currentRecipe = {
                        id: params['id'],
                        ...data
                    } as Recipe;
                }
            )
        })
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    };

    onAddToShoppingList() {
        this.apiService.createIngredients(this.currentRecipe.ingredients)
    };

    onEditRecipe() {
        this.router.navigate(['recipes', this.currentRecipe.id, 'edit']);
    };

    onDeleteRecipe() {
        this.apiService.deleteRecipe(this.currentRecipe.id);
        this.router.navigate(['recipes']);
    }

};

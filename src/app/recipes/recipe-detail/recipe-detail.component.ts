import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from 'src/app/shared/api.service';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
    selector: 'app-recipe-detail',
    templateUrl: './recipe-detail.component.html',
    styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit, OnDestroy {
    sub: Subscription;
    currentRecipe: Recipe;

    constructor(private apiService: ApiService,  private authService: AuthService, private route: ActivatedRoute, private router: Router) { };

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
        this.apiService.createIngredients(this.currentRecipe.ingredients);
    };

    onEditRecipe() {
        this.router.navigate(['recipes', this.currentRecipe.id, 'edit']);
    };

    onDeleteRecipe() {
        // this._storage.storage.refFromURL(post.coverPic).delete()
        
        this.apiService.deleteRecipe(this.currentRecipe);
        this.router.navigate(['recipes']);
    };

    isAuth() {
        return this.authService.isAuth();
    };

};

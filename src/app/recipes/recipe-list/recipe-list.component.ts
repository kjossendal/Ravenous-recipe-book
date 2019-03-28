import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model';
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

    constructor(private apiService: ApiService) { };

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
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    };
}

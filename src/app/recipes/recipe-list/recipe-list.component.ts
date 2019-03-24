import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    @Output() recipeSelected = new EventEmitter<Recipe>();
    recipes: Recipe[] = [
        new Recipe('Tacos', 'Delicious street tacos', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/de/45/54/soft-shell-tacos.jpg'),
        new Recipe('Bavarian Tacos', 'Delicious street tacos', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/de/45/54/soft-shell-tacos.jpg')
    ];

    constructor() { }

    onRecipeSelected(recipe: Recipe) {
        this.recipeSelected.emit(recipe);
    }

    ngOnInit() {
    }

}

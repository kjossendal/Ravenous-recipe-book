import { Injectable } from '@angular/core';
import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shoppingList.service';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { ApiService } from '../shared/api.service';

@Injectable()
export class RecipeService {
    recipesChanged = new Subject<Recipe[]>();

    private recipes: Recipe[];
    // private recipes: Recipe[] = [
    //     new Recipe(
    //         0,
    //         'Tacos', 
    //         'Delicious street tacos',
    //         'https://media-cdn.tripadvisor.com/media/photo-s/0d/de/45/54/soft-shell-tacos.jpg',
    //         [
    //             new Ingredient('Skirt steak', 1, 'lb'),
    //             new Ingredient('Red onion', 1, ''),
    //             new Ingredient('Cilantro', 1, 'bunch'),
    //             new Ingredient('Chili Peppers', 3, ''),
    //             new Ingredient('Tortillas', 24, ''),
    //         ]
    //     ),
    //     new Recipe(
    //         1,
    //         'Bavarian Tacos', 
    //         'Delicious  Bavarian street tacos', 
    //         'http://www.publix.com/-/media/aprons/images/2015/11/m0001313_600x440.jpg?as=1&w=417&h=306&hash=F6B58CB5B1A58B106C98E19585635C99FD3B975D', 
    //         [
    //             new Ingredient('Smoked Bavarian sausage', 4, 'links'),
    //             new Ingredient('Sweet onion', 1, 'large'),
    //             new Ingredient('Butter', 2, 'tbsp'),
    //             new Ingredient('Paprika', 1, 'tbsp'),
    //             new Ingredient('Saurkraut', 1, 'cup'),
    //             new Ingredient('Tortillas', 24, 'flour'),
    //         ]
    //     )
    // ];

    constructor( private shoppingListService: ShoppingListService) { }

    getRecipeByIndex(index) {
        return this.recipes[index];
    };

    addIngredientsToShoppingList(ingredients: Ingredient[]) {
        // this.apiService.addIngredients(ingredients);
    };
};
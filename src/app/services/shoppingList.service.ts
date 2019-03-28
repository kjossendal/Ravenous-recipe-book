import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';
import { ApiService } from '../shared/api.service';
import { Injectable } from '@angular/core';

@Injectable()
export class ShoppingListService {
    onAddIngredient = new Subject<Ingredient[]>();
    enabledEditing = new Subject<string>();

    private ingredients: Ingredient[];
    //  = [
    //     new Ingredient('Beef', 1, 'lb'),
    //     new Ingredient('Tortillas', 30, ''),
    // ];

    constructor(private apiService: ApiService) {};

    getIngredients() {
        // return this.ingredients.slice();
    };

    getIngredient(id: number) {
        // TODO rewrite when built in to firestore
        // return this.ingredients.find((i) => {
            // return i.id === id;
        // })
    };

    addIngredient(ingredient: Ingredient) {
        // this.ingredients.push(ingredient);
        // this.onAddIngredient.next(this.ingredients.slice());
        // this.apiService.addIngredient(ingredient)
        //     .then(resp => {})
        //     .catch(err => { throw new Error(err) })
    };

    updateIngredient(id: number, newIngredient: Ingredient) {
        // let index = this.ingredients.findIndex((ingredient) => {
        //     return ingredient.id === id;
        // }); 
        // this.ingredients[index] = newIngredient;
        // this.onAddIngredient.next(this.ingredients.slice());
    };

    deleteIngredient(id) {
        // let cut = this.ingredients.findIndex((ingredient) => {
        //     return ingredient.id === id;
        // });
        // this.ingredients.splice(cut, 1);
        // this.onAddIngredient.next(this.ingredients.slice());
    };

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.onAddIngredient.next(this.ingredients.slice())
    }
}
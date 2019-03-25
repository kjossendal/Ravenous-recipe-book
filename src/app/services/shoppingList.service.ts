import { Ingredient } from '../shared/ingredient.model';
import { Subject } from 'rxjs';

export class ShoppingListService {
    onAddIngredient = new Subject<Ingredient[]>();

    private ingredients: Ingredient[] = [
        new Ingredient('Beef', 1, 'lb'),
        new Ingredient('Tortillas', 30, ''),
    ];

    getIngredients() {
        return this.ingredients.slice();
    }

    addIngredient(ingredient: Ingredient) {
        this.ingredients.push(ingredient);
        this.onAddIngredient.next(this.ingredients.slice())
    }

    addIngredients(ingredients: Ingredient[]) {
        this.ingredients.push(...ingredients);
        this.onAddIngredient.next(this.ingredients.slice())
    }
}
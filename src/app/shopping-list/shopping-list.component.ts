import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shoppingList.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private subscription: Subscription;
    highlightedItemIndex: number = null;

    ingredients: Ingredient[]; 

    constructor(private shoppingListService: ShoppingListService) { };

    ngOnInit() {
        this.ingredients = this.shoppingListService.getIngredients();
        this.subscription = this.shoppingListService.onAddIngredient.subscribe((ingredients: Ingredient[]) => {
            this.ingredients = ingredients;
        })
    };

    ngOnDestroy() {
        this.subscription.unsubscribe();
    };

    onEditIngredient(id: number) {
        this.shoppingListService.enabledEditing.next(id);
    };

    onMouseEnter(index) {
        console.log(index)
        this.highlightedItemIndex = index;
    };

    onMouseLeave() {
        this.highlightedItemIndex = null;
    };

    onItemDelete(index) {
        this.ingredients.splice(index, 1)
    }
};

import { Component, OnInit } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shoppingList.service';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate-guard.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, CanDeactivateGuard {
    units = [
        { val: 'tsp', text: 'tsp'},
        { val: 'cup', text: 'cup'},
        { val: 'gram', text: 'gram'},
    ];
    ingredient = new Ingredient('',null,'');

    constructor(private shoppingListService: ShoppingListService) { };

    ngOnInit() {
    }

    onAddIngredient() {
        if(this.ingredient.name && this.ingredient.amount) {
            this.shoppingListService.addIngredient(this.ingredient)
        }
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        // do some logic here to check if an edit is currently in process 
        return true
    }
};

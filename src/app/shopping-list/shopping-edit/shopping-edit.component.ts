import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
    @Output() ingredientAdded = new EventEmitter<{name: string, amount: number, unit: string}>();
    units = [
        { val: 'tsp', text: 'tsp'},
        { val: 'cup', text: 'cup'},
        { val: 'gram', text: 'gram'},
    ];
    ingredient = new Ingredient('',null,'');

    constructor() {

    }

    onAddIngredient() {
        console.log("ingredient", this.ingredient)
        if(this.ingredient.name && this.ingredient.amount) {
            this.ingredientAdded.emit(this.ingredient)
        }
    }

    ngOnInit() {
    }

}

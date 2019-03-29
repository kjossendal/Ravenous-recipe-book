import { Component, OnInit, OnDestroy } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../services/shoppingList.service';
import { Subscription } from 'rxjs';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    private sub: Subscription;
    private working: Boolean = false;
    highlightedItemIndex: number = null;

    ingredients: Ingredient[]; 

    constructor(
        private shoppingListService: ShoppingListService,
        private apiService: ApiService
    ) { };

    ngOnInit() {
        this.sub = this.apiService.getIngredients().subscribe(
            (data) => {
                this.ingredients = data.map(e => {
                    this.working = false;
                    return {
                        id: e.payload.doc.id,
                        ...e.payload.doc.data()
                    } as Ingredient
                })
            },
            (err) => {
                console.log("Error fetching Ingredients", err)
                this.working = false;
            }
        )
        // this.subscription = this.shoppingListService.onAddIngredient.subscribe((ingredients: Ingredient[]) => {
        //     this.ingredients = ingredients;
        // })
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    };

    onEditIngredient(id: string) {
        this.shoppingListService.enabledEditing.next(id);
    };

    onMouseEnter(index) {
        this.highlightedItemIndex = index;
    };

    onMouseLeave() {
        this.highlightedItemIndex = null;
    };

    onItemDelete(id: string) {
        this.apiService.deleteIngredient(id)
            .then(resp => {console.log(resp)})
            .catch(err => {console.log(err)})
    }
};

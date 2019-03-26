import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListService } from 'src/app/services/shoppingList.service';
import { CanDeactivateGuard } from 'src/app/services/can-deactivate-guard.service';
import { Observable, Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { UnitsService } from 'src/app/services/units.service';
import { Unit } from 'src/app/shared/unit.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy, CanDeactivateGuard {
    @ViewChild('f') ingredientForm: NgForm;
    sub: Subscription;
    editMode = false;
    editableItem: Ingredient;
    units: Unit[];

    constructor(private shoppingListService: ShoppingListService, private unitsService: UnitsService) { };

    ngOnInit() {
        this.units = this.unitsService.getUnits();

        this.sub = this.shoppingListService.enabledEditing.subscribe(
            (id: number) => {
                this.editMode = true;
                this.editableItem = this.shoppingListService.getIngredient(id);
                this.ingredientForm.setValue({
                    name: this.editableItem.name,
                    amount: this.editableItem.amount,
                    unit: this.editableItem.unit || ''
                })
            }
        )
    };

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onSubmit(form: NgForm) {
        const ingredient = new Ingredient(null, form.value.name, form.value.amount, form.value.unit);
        if(ingredient.name && ingredient.amount) {
            if(this.editMode) {
                this.shoppingListService.updateIngredient(this.editableItem.id, ingredient);
                this.editMode = false;
            } else {
                this.shoppingListService.addIngredient(ingredient);
            }
        } else { throw new Error("Name and amount required")}
        form.reset();
    };

    onDeleteIngredient(id) {
        this.shoppingListService.deleteIngredient(id);
    }

    onClearIngredient(form: NgForm) {
        this.editMode = false;
        form.reset();
    }

    canDeactivate(): Observable<boolean> | Promise<boolean> | boolean {
        // do some logic here to check if an edit is currently in process 
        return true
    }
};

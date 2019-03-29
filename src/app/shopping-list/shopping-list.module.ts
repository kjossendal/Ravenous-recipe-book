import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
    declarations: [
        ShoppingEditComponent,
        ShoppingListComponent,
    ],
    imports: [
        CommonModule,
        FormsModule,
        SharedModule,
    ]
})
export class ShoppingListModule {}
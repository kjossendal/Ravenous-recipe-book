import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private db: AngularFirestore) { 
    }

    updateRecipe(recipe: Recipe) {
        return this.db.doc<Recipe>('recipes/' + recipe.id).update({...recipe});
    };
    createRecipe(recipe: Recipe){
        return this.db.collection<Recipe>('recipes').add({...recipe});
    };
    getRecipes() {
        return this.db.collection<Recipe>('recipes').snapshotChanges();
    };
    getNextRecipes() {
        return this.db.collection('recipes', ref => ref.limit(1)).snapshotChanges();
    }
    getRecipeById(id: string) {
        return this.db.collection<Recipe>('recipes').doc('/'+ id).valueChanges();
    };
    deleteRecipe(id: string) {
        return this.db.doc<Recipe>('recipes/' + id).delete();
    };

    /* ****** Shopping List Section ************* */

    getIngredients() {
        return this.db.collection<Ingredient>('shopping-list').snapshotChanges();
    };
    getIngredientById(id: string) {
        return this.db.collection<Ingredient>('shopping-list').doc('/'+id).valueChanges();
    }
    createIngredient(ingredient: Ingredient) {
        return this.db.collection<Ingredient>('shopping-list').add({...ingredient});
    };
    createIngredients(ingredients: Ingredient[]) {
        ingredients.forEach(i => {
            this.createIngredient(i)
        })
    };
    updateIngredient(ingredient: Ingredient) {
        console.log("API UPDATE", ingredient)
        return this.db.doc<Ingredient>('shopping-list/' + ingredient.id).update({...ingredient})
    };
    deleteIngredient(id: string) {
        return this.db.doc<Ingredient>('shopping-list/' + id).delete();
    }
};

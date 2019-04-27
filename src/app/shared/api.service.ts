import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import * as fb from 'firebase';

import { Recipe } from '../recipes/recipe.model';
import { Ingredient } from './ingredient.model';
import { AngularFireStorage } from '@angular/fire/storage';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private db: AngularFirestore, private storage: AngularFireStorage) { 
    }

    updateRecipe(id, recipe: Recipe) {
        return this.db.doc<Recipe>('recipes/' + id).update({...recipe});
    };
    createRecipe(recipe){
        return this.db.collection<any>('recipes').add({...recipe, lastUpdated: fb.firestore.Timestamp.now()});
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
    getNewestRecipes() {
        return this.db.collection<Recipe>('recipes', ref => ref.orderBy('lastUpdated', 'desc').limit(3)).snapshotChanges();
    }
    deleteRecipe(recipe: Recipe) {
        return this.db.doc<Recipe>('recipes/' + recipe.id).delete()
        .then(() => {
            // cascade deletion of images related to a recipe
            return this.storage.storage.refFromURL(recipe.imagePath);
        })
        .then(ref => {
            if(ref) {
                return ref.delete()
            }
        })
        .catch(err => console.log("Error on delete", err))
    };
    searchRecipes(term: string) {
        return this.db.collection<Recipe>('recipes', ref => ref.where('tags.'+term,'==', true)).snapshotChanges()
    }

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
        return this.db.doc<Ingredient>('shopping-list/' + ingredient.id).update({...ingredient})
    };
    deleteIngredient(id: string) {
        return this.db.doc<Ingredient>('shopping-list/' + id).delete();
    }
};

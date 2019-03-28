import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

import { Recipe } from '../recipes/recipe.model';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    constructor(private db: AngularFirestore) { }

    updateRecipe(recipe: Recipe) {
        return this.db.doc<Recipe>('recipes/' + recipe.id).update({...recipe});
    };
    createRecipe(recipe: Recipe){
        return this.db.collection<Recipe>('recipes').add({...recipe});
    };
    getRecipes() {
        return this.db.collection<Recipe>('recipes').snapshotChanges();
    };
    getRecipeById(id: string) {
        return this.db.collection<Recipe>('recipes').doc('/'+ id).valueChanges();
    };
    deleteRecipe(id: string) {
        return this.db.doc<Recipe>('recipes/' + id).delete();
    };
};

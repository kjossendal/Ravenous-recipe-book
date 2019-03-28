import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';

import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { defineBase } from '@angular/core/src/render3';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    recipeUrl: string = 'https://ravenous-recipes.firebaseio.com/recipes.json';

    constructor(private http: Http, private db: AngularFirestore) { }

    updateRecipe(recipe: Recipe) {
        // delete recipe.id;
        this.db.doc<Recipe>('recipes/' + recipe.id).update({...recipe})
    };

    createRecipe(recipe: Recipe){
        return this.db.collection<Recipe>('recipes').add({...recipe});
    };
    getRecipes() {
        return this.db.collection<Recipe>('recipes').snapshotChanges()
    };
    getRecipeById(id: number) {
        return this.db.collection<Recipe>('recipes').doc('/'+ id).valueChanges()
    };
};

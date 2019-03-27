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

    putRecipe(recipe: Recipe) {
        console.log("PUTTING", recipe);
        // const headers = new Headers({'Content-type': 'application/json'})
        return this.http.put(this.recipeUrl, recipe);
    };

    postRecipe(recipe: Recipe) {
        console.log("POSTING", recipe);
        // const headers = new Headers({'Content-type': 'application/json'})
        return this.http.post(this.recipeUrl, recipe);
    };
    getRecipes() {
        return this.db.collection<Recipe>('recipes').snapshotChanges()
    };
    getRecipeById(id: number) {
        return this.db.collection('recipes').doc('/'+ id).valueChanges()
    };
};

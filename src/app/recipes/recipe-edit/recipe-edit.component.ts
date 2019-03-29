import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/services/units.service';
import { Recipe } from '../recipe.model';
import { ApiService } from 'src/app/shared/api.service';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: string;
    editable: boolean = false;
    recipeForm: FormGroup;
    units: Unit[];
    working: Boolean = true;

    constructor(
        private route: ActivatedRoute, 
        private apiService: ApiService,
        private router: Router,
        private unitsService: UnitsService,
    ) { }

    ngOnInit() {
        this.units = this.unitsService.getUnits();

        this.route.params.subscribe((params: Params) => {
            this.id = params['id'];
            this.editable = params['id'] !== undefined;
            this.initForm();
        })
    };

    private initForm() {
        let recipeName = '';
        let recipeImagePath = '';
        let recipeDescription = '';
        let recipeIngredients = new FormArray([]);

        if(this.editable) {
            this.apiService.getRecipeById(this.id).subscribe(
                (data: Recipe) => {
                    recipeName = data.name;
                    recipeImagePath = data.imagePath;
                    recipeDescription = data.description;
                    data.ingredients.map(i => {
                        recipeIngredients.push(
                            new FormGroup({
                                'name': new FormControl(i.name, Validators.required),
                                'amount': new FormControl(i.amount, [
                                    Validators.required, 
                                    Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$/)
                                ]),
                                'unit': new FormControl(i.unit)
                            })
                        ) 
                    })
                    this.recipeForm = new FormGroup({
                        'name': new FormControl(recipeName, Validators.required),
                        'imagePath': new FormControl(recipeImagePath, Validators.required),
                        'description': new FormControl(recipeDescription, Validators.required),
                        'ingredients': recipeIngredients,
                    })
                    return
                },
                (err) => { throw new Error(err) }
            )
        }

        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients,
        })
        this.working = false;
    };

    onSubmit() {
        const r = this.recipeForm.value;

        if (this.editable) {
            const newRecipe = new Recipe(this.id, r.name, r.description, r.imagePath, r.ingredients);
            this.apiService.updateRecipe(newRecipe)
                .then(() => {
                    this.router.navigate(['recipes/' + this.id])
                })
                .catch(err => {
                    throw new Error(err)
                })
        } else {
            const newRecipe = {name: r.name, description: r.description, imagePath: r.imagePath, ingredients: r.ingredients} as Recipe
            this.apiService.createRecipe(newRecipe)
                .then((resp) => {
                    this.router.navigate(['recipes', resp.id])
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
    };

    onAddIngredient() {
        (<FormArray>this.recipeForm.get('ingredients')).push(
            new FormGroup({
                'name': new FormControl(null, Validators.required),
                'amount': new FormControl(null, [
                    Validators.required, 
                    Validators.pattern(/^\s*(?=.*[1-9])\d*(?:\.\d{1,3})?\s*$/)
                ]),
                'unit': new FormControl()
            })
        );
    };

    onDeleteIngredient(index) {
        (<FormArray>this.recipeForm.get(['ingredients'])).removeAt(index);
    };

    onCancelEdit() {
        this.router.navigate(['../'], {relativeTo: this.route})
    };

    getControls() {
        return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

};

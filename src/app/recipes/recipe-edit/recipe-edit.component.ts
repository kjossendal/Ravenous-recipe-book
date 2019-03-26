import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from 'src/app/services/recipe.service';
import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/services/units.service';
import { Recipe } from '../recipe.model';

@Component({
    selector: 'app-recipe-edit',
    templateUrl: './recipe-edit.component.html',
    styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
    id: number;
    editable: boolean = false;
    recipeForm: FormGroup;
    units: Unit[];

    constructor(
        private route: ActivatedRoute, 
        private unitsService: UnitsService,
        private recipeService: RecipeService) { }

    ngOnInit() {
        this.units = this.unitsService.getUnits();

        this.route.params.subscribe((params: Params) => {
            this.id = +params['id'];
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
            const recipe = this.recipeService.getRecipeById(this.id);
            recipeName = recipe.name;
            recipeImagePath = recipe.imagePath;
            recipeDescription = recipe.description;
            if(recipe.ingredients) {
                for(let i of recipe.ingredients) {
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
                }
            }
        }
        this.recipeForm = new FormGroup({
            'name': new FormControl(recipeName, Validators.required),
            'imagePath': new FormControl(recipeImagePath, Validators.required),
            'description': new FormControl(recipeDescription, Validators.required),
            'ingredients': recipeIngredients,
        })
    };

    onSubmit() {
        let r = this.recipeForm.value;
        console.log(r)
        const newRecipe = new Recipe(null, r.name, r.description, r.imagePath, r.ingredients);
        if (this.editable) {
            this.recipeService.updateRecipe(this.id, newRecipe)
        } else {
            this.recipeService.addRecipe(newRecipe);
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
        )
    }

}

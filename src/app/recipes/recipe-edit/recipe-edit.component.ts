import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import * as firebase from 'firebase';

import { Unit } from 'src/app/shared/unit.model';
import { UnitsService } from 'src/app/services/units.service';
import { Recipe } from '../recipe.model';
import { ApiService } from 'src/app/shared/api.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { Observable } from 'rxjs';

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
    html = ``;
    uploadPercent: Observable<number>;
    downloadURL: Observable<string>;
    downloadURLString: string;
    showLoadingProgress: boolean = false;

    constructor(
        private route: ActivatedRoute, 
        private apiService: ApiService,
        private router: Router,
        private unitsService: UnitsService,
        private storage: AngularFireStorage
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
        let recipeInstructions = '';
        let recipeIngredients = new FormArray([]);
        let recipeTags = [];
        let tagsString = '';

        if(this.editable) {
            this.apiService.getRecipeById(this.id).subscribe(
                (data: Recipe) => {
                    recipeName = data.name;
                    recipeImagePath = data.imagePath;
                    recipeDescription = data.description;
                    recipeInstructions = data.instructions;
                    // create comma separated string from hasmap
                    Object.keys(data.tags).forEach(key => {
                        recipeTags.push(key)
                    });
                    tagsString = recipeTags.join()
                    // create inputs from each ingredient
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
                        'instructions': new FormControl(recipeInstructions, Validators.required),
                        'ingredients': recipeIngredients,
                        'tags': new FormControl(tagsString, Validators.required)
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
            'instructions': new FormControl(recipeInstructions, Validators.required),
            'ingredients': recipeIngredients,
            'tags': new FormControl(tagsString, Validators.required)
        })
        this.working = false;
    };

    onSubmit() {
        const r = this.recipeForm.value;
        // determine if image is url or local file
        const image = this.downloadURLString ? this.downloadURLString : r.imagePath
        // create hasmap from comma separated tag values
        let tags = {};
        r.tags.split(',').map(tag => {
            tags[tag.trim()] = true
        })
        if (this.editable) {
            const newRecipe = new Recipe(
                this.id, 
                r.name, 
                r.description, 
                r.instructions, 
                image, 
                r.ingredients, 
                tags, 
                firebase.firestore.Timestamp.now()
            );
            this.apiService.updateRecipe(this.id, newRecipe)
                .then(() => {
                    this.router.navigate(['recipes/' + this.id])
                })
                .catch(err => {
                    throw new Error(err)
                })
        } else {
            const newRecipe = {
                name: r.name, 
                description: r.description, 
                instructions: r.instructions, 
                imagePath: image, 
                ingredients: r.ingredients, 
                tags:tags, 
                lastUpdated: firebase.firestore.Timestamp.now()
            };
            this.apiService.createRecipe(newRecipe)
                .then((resp) => {
                    this.router.navigate(['recipes', resp.id])
                })
                .catch(err => {
                    throw new Error(err)
                })
        }
    };

    uploadFile(event) {
        this.showLoadingProgress = true;
        const pathName = 'recipe_images/' + new Date().toString();
        const file = event.target.files[0];
        const filePath = pathName;
        const fileRef = this.storage.ref(filePath);
        const task = this.storage.upload(filePath, file)
        this.uploadPercent = task.percentageChanges();
        task.then((val) => {
            fileRef.getDownloadURL().subscribe(
                (url) => {
                    this.downloadURLString = url;
                    // add to the reactive form control
                    (<FormControl>this.recipeForm.get('imagePath')).setValue(this.downloadURLString);
                },
                (err) => {
                    console.log("Error getting download url", err)
                }
            )
        })
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
    };

    // tiny mce configuration
    config: any = {
        height: 250,
        theme: 'modern',
        // powerpaste advcode toc tinymcespellchecker a11ychecker mediaembed linkchecker help
        plugins: 'print preview fullpage searchreplace autolink directionality visualblocks visualchars fullscreen image imagetools link media template codesample table charmap hr pagebreak nonbreaking anchor insertdatetime advlist lists textcolor wordcount contextmenu colorpicker textpattern',
        toolbar: 'formatselect | bold italic strikethrough forecolor backcolor | link | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent  | removeformat',
        image_advtab: true,
        imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions',
        templates: [
          { title: 'Test template 1', content: 'Test 1' },
          { title: 'Test template 2', content: 'Test 2' }
        ],
        content_css: [
          '//fonts.googleapis.com/css?family=Lato:300,300i,400,400i',
          '//www.tinymce.com/css/codepen.min.css'
        ]
    };

};

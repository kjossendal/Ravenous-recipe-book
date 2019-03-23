import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
    recipes: Recipe[] = [
        new Recipe('Tacos', 'Delicious street tacos', 'https://media-cdn.tripadvisor.com/media/photo-s/0d/de/45/54/soft-shell-tacos.jpg')
    ];

    constructor() { }

    ngOnInit() {
    }

}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipe-toolbar',
  templateUrl: './recipe-toolbar.component.html',
  styleUrls: ['./recipe-toolbar.component.css']
})
export class RecipeToolbarComponent implements OnInit {

    constructor(private router: Router) { }

    ngOnInit() {
    }

    addNewRecipe() {
        console.log(this.router.navigate(['recipes/create']))
        this.router.navigate(['recipes/create'])
    }

}

import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../../recipe.model';

@Component({
  selector: 'app-recipe-item-card',
  templateUrl: './recipe-item-card.component.html',
  styleUrls: ['./recipe-item-card.component.css']
})
export class RecipeItemCardComponent implements OnInit {
    @Input() recipe: Recipe;

  constructor() { }

  ngOnInit() {
  }

}

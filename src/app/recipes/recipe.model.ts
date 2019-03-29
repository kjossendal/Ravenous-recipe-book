import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    public instructions: string;
    public imagePath: string;
    public ingredients: Ingredient[];

    constructor(id: string, name: string, desc: string, instructions: string, imagePath: string, ingredients: Ingredient[]) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.instructions = instructions;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
    }
};
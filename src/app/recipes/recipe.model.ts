import { Ingredient } from '../shared/ingredient.model';

export class Recipe {
    public id: string;
    public name: string;
    public description: string;
    public instructions: string;
    public imagePath: string;
    public ingredients: Ingredient[];
    public tags: Object;
    public lastUpdated: Object; // not sure if this should be typed as a firebase timestamp?

    constructor(
        id: string, 
        name: string, 
        desc: string, 
        instructions: string, 
        imagePath: string, 
        ingredients: Ingredient[],
        tags: Object,
        lastUpdated: Object) {
        this.id = id;
        this.name = name;
        this.description = desc;
        this.instructions = instructions;
        this.imagePath = imagePath;
        this.ingredients = ingredients;
        this.tags = tags;
        this.lastUpdated = lastUpdated;
    }
};
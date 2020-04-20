import { Injectable } from '@nestjs/common';
import { NewRecipeInput } from './dto/new-recipe.input';
import { RecipesArgs } from './dto/recipes.args';
import { Recipe } from './models/recipe.model';
import { RecipeInterface } from './interfaces/recipe.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class RecipesService {
  constructor(@InjectModel('Recipe') private recipeModel: Model<RecipeInterface>) { }

  private parseToRecipe(obj: RecipeInterface) {
    const recipe: Recipe = new Recipe();
    recipe.id = obj.id;
    recipe.title = obj.title;
    recipe.description = obj.description;
    recipe.creationDate = new Date();
    recipe.ingredients = ["uno", "dos", "tres"];
    return recipe;
  }

  async create(data: NewRecipeInput): Promise<Recipe> {
    const createdRecipe = new this.recipeModel(data);
    const obj = await createdRecipe.save();
    const recipe: Recipe = this.parseToRecipe(obj);
    return recipe;
  }
  async findOneById(id: string): Promise<Recipe> {
    const obj = await this.recipeModel.findOne({ _id: id }).exec();
    if (obj) {
      const recipe: Recipe = this.parseToRecipe(obj);
      return recipe;
    }
    return null;
  }

  async findAll(recipesArgs: RecipesArgs): Promise<Recipe[]> {
    const objs = await this.recipeModel.find().exec();
    const recipes: Recipe[] = [];
    objs.forEach(element => {
      recipes.push(this.parseToRecipe(element))
    });
    return recipes;
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}
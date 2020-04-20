import { Document } from 'mongoose';

export interface RecipeInterface extends Document {
  readonly title: string;
  readonly description: string;
}
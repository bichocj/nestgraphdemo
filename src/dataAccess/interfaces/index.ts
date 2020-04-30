import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly username: string,
  readonly password: string,
}

export interface CategoryDocument extends Document {
  readonly name: string,
  readonly isActive: boolean;
  readonly isPublished: boolean;
}

export interface ProductDocument extends Document {
  readonly name: string,
  readonly description: string,
  readonly price: number,
  readonly cost: number,
  readonly restaurantId: string,
  readonly categoryId: string,
  readonly extras: [],
  readonly isActive: boolean;
  readonly isPublished: boolean;
}

export interface RestaurantInterface extends Document {
  readonly name: string,
  readonly address: string
}

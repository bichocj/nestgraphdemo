import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly username: string,
  readonly password: string,
}

export interface CategoryInterface extends Document {
  readonly name: string,
}

export interface ProductInterface extends Document {
  readonly name: string,
  readonly description: string,
  readonly price: number,
  readonly cost: number,
  readonly restaurantId: string,
  readonly categoryId: string,
  readonly extras: [],
}

export interface RestaurantInterface extends Document {
  readonly name: string,
  readonly address: string
}

import { Document } from 'mongoose';

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
}

export interface RestaurantInterface extends Document {
  readonly name: string,
  readonly address: string
}

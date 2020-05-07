import { Document } from 'mongoose';

export interface UserInterface extends Document {
  readonly username: string,
  readonly password: string,
  readonly isSuperUser: boolean,
}

export interface CategoryDocument extends Document {
  readonly name: string,
  readonly photo: string,
  readonly isActive: boolean;
  readonly isPublished: boolean;
}

export interface ProductDocument extends Document {
  readonly name: string,
  readonly description: string,
  readonly photo: string,
  readonly price: number,
  readonly cost: number,
  readonly restaurantId: string,
  readonly categoryId: string,
  readonly extras: [],
  readonly isPrimary: boolean;
  readonly isActive: boolean;
  readonly isPublished: boolean;
}

export interface RestaurantDocument extends Document {
  readonly name: string,
  readonly address: string,  
  readonly isActive: boolean;
  readonly isPublished: boolean;
  readonly users: [any];
}

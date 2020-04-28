import { Document } from 'mongoose';

export interface RestaurantInterface extends Document {
  readonly name: string,
  readonly address: string
}

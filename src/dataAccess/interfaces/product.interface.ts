import { Document } from 'mongoose';

export interface ProductInterface extends Document {
  readonly name: string,
  readonly description: string,
  readonly price: number,
  readonly cost: number,
  readonly restaurantId: string,
}

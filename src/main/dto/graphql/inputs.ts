import { Field, InputType, Float, ID } from '@nestjs/graphql';
import { MaxLength } from 'class-validator';

@InputType()
export class RestaurantInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @MaxLength(255)
  address?: string;
}

@InputType()
export class CategoryInput {
  @Field()
  @MaxLength(30)
  name: string;
}

@InputType()
export class ProductExtraInput {
  @Field(type => ID)
  productId: string;

  @Field(type => Float)
  price: number;
}


@InputType()
export class ProductInput {
  @Field()
  @MaxLength(30)
  name: string;

  @Field({ nullable: true })
  @MaxLength(255)
  description?: string;

  @Field(type => Float)
  price: number;

  @Field(type => Float)
  cost: number;

  @Field(type => ID)
  restaurantId: string;

  @Field(type => ID)
  categoryId: string;

  @Field(type => [ProductExtraInput])
  extras?: ProductExtraInput[];
}
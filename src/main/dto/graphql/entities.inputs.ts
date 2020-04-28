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
}
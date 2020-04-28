import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Restaurant {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field({ nullable: true })
  address?: string;

  @Field(type => [Product])
  products?: Product[];

}


@ObjectType()
export class Product {
  @Field(type => ID)
  id: string;
  
  @Field()
  name: string;
  
  @Field({ nullable: true })
  description?: string;

  @Field()
  price: number;

  @Field()
  cost: number;

  @Field(type => ID)
  restaurantId: string;

}
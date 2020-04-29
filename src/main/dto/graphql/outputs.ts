import { Field, ID, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;

}

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

  @Field(type => User, { nullable: true })
  owner?: User;

}


@ObjectType()
export class Category {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

}

@ObjectType()
export class ProductExtra {  
  @Field(type => ID)
  productId: string;

  @Field()
  name: string;

  @Field()
  price: number;
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

  @Field(type => ID)
  categoryId: string;

  @Field(type => Restaurant)
  restaurant?: string;

  @Field(type => [ProductExtra], { defaultValue: [] })
  extras?: ProductExtra[]
}
import { Field, ID, ObjectType } from '@nestjs/graphql';


@ObjectType()
export class User {
  @Field(type => ID)
  id: string;

  @Field()
  username: string;
  
  @Field(type => Boolean)
  isSuperUser: boolean;
}

@ObjectType()
export class RestaurantUser {
  @Field(type => User)
  user: User;

  @Field()
  rol: string;
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

  @Field(type => [RestaurantUser])
  users?: RestaurantUser[];

  @Field(type => Boolean)
  isActive: boolean;

  @Field(type => Boolean)
  isPublished: boolean;
}


@ObjectType()
export class Category {
  @Field(type => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  isActive: boolean;

  @Field()
  isPublished: boolean;
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

  @Field(type => Restaurant)
  restaurant?: object;

  @Field(type => ID)
  categoryId: string;

  @Field(type => Category)
  category?: object;

  @Field(type => [ProductExtra], { defaultValue: [] })
  extras?: ProductExtra[]

  @Field()
  isActive: boolean;

  @Field()
  isPublished: boolean;
}
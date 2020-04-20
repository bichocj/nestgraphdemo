import { Field, InputType, Float } from '@nestjs/graphql';
import { Length, MaxLength } from 'class-validator';

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
}
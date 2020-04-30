import { MongooseModule } from '@nestjs/mongoose';
import { Module, Scope } from '@nestjs/common';

import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductSchema, RestaurantSchema, CategorySchema, UserSchema } from '../dataAccess/schemas';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantsService } from './restaurants.service';
import { OwnerDataLoader, RestaurantDataLoader } from './dataloaders';
import { CategoriesResolver } from './categories.resolvers';
import { CategoriesService } from './categories.service';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolvers';
@Module({
  imports: [MongooseModule.forFeature([
    { name: 'User', schema: UserSchema },
    { name: 'Product', schema: ProductSchema },
    { name: 'Restaurant', schema: RestaurantSchema },
    { name: 'Category', schema: CategorySchema }
  ])],
  providers: [
    UsersService, UsersResolver,
    RestaurantsService, RestaurantsResolver,
    ProductsService, ProductsResolver,
    CategoriesService, CategoriesResolver,
    {
      inject: [ProductsService],
      useFactory: OwnerDataLoader.create,
      provide: OwnerDataLoader,
      scope: Scope.REQUEST
    },
    {
      inject: [RestaurantsService],
      useFactory: RestaurantDataLoader.create,
      provide: RestaurantDataLoader,
      scope: Scope.REQUEST
    },
  ],
  exports: [ProductsService, UsersService]
})

export class MainModule { }

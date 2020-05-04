import { MongooseModule } from '@nestjs/mongoose';
import { Module, Scope } from '@nestjs/common';

import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductSchema, RestaurantSchema, CategorySchema, UserSchema } from '../dataAccess/schemas';
import { RestaurantsResolver } from './resolvers/restaurants.resolver';
import { RestaurantsService } from './services/restaurants.service';
import { RestaurantDataLoader, CategoryDataLoader, UserDataLoader } from './resolvers/dataLoaders';
import { CategoriesResolver } from './resolvers/categories.resolvers';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { UsersResolver } from './resolvers/users.resolvers';
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
      inject: [RestaurantsService],
      useFactory: RestaurantDataLoader.create,
      provide: RestaurantDataLoader,
      scope: Scope.REQUEST
    },
    {
      inject: [CategoriesService],
      useFactory: CategoryDataLoader.create,
      provide: CategoryDataLoader,
      scope: Scope.REQUEST
    },
    {
      inject: [UsersService],
      useFactory: UserDataLoader.create,
      provide: UserDataLoader,
      scope: Scope.REQUEST
    },
  ],
  exports: [ProductsService, UsersService]
})

export class MainModule { }

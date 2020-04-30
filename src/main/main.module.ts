import { MongooseModule } from '@nestjs/mongoose';
import { Module, Scope } from '@nestjs/common';

import { ProductsService } from './services/products.service';
import { ProductsResolver } from './resolvers/products.resolver';
import { ProductSchema, RestaurantSchema, CategorySchema, UserSchema } from '../dataAccess/schemas';
import { RestaurantsResolver } from './resolvers/restaurants.resolver';
import { RestaurantsService } from './services/restaurants.service';
import { OwnerDataLoader, RestaurantDataLoader } from './resolvers/dataloaders';
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

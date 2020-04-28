import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductSchema } from '../dataAccess/schemas/product.schema';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantSchema } from '../dataAccess/schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsService } from './restaurants.service';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema },
    { name: 'Restaurant', schema: RestaurantSchema }
  ])],
  providers: [
    RestaurantsService, RestaurantsResolver,
    ProductsService, ProductsResolver
  ]
})

export class MainModule {}

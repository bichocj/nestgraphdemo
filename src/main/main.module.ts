import { Module, Scope } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsResolver } from './products.resolver';
import { ProductSchema } from '../dataAccess/schemas/product.schema';
import { RestaurantsResolver } from './restaurants.resolver';
import { RestaurantSchema } from '../dataAccess/schemas/restaurant.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { RestaurantsService } from './restaurants.service';
import { OwnerDataLoader } from './dataloaders';

@Module({
  imports: [MongooseModule.forFeature([
    { name: 'Product', schema: ProductSchema },
    { name: 'Restaurant', schema: RestaurantSchema }
  ])],
  providers: [
    RestaurantsService, RestaurantsResolver,
    ProductsService, ProductsResolver,
    {
      inject: [ProductsService],
      useFactory: OwnerDataLoader.create,
      provide: OwnerDataLoader,
      scope: Scope.REQUEST
    }
  ],
  exports: [ProductsService]
})

export class MainModule { }

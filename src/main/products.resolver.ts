import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';

import { ProductsService } from './products.service';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { Product, Restaurant } from './dto/graphql/outputs';
import { ProductInput } from './dto/graphql/inputs';
import { productInputToDto } from './dto/transformers';
import { RestaurantDataLoader } from './dataloaders';
import { ProductDto } from 'src/dataAccess/dto';

@Resolver(of => Product)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly restaurantDataLoader: RestaurantDataLoader
    ) { }

  @Query(returns => Product)
  async product(@Args('id') id: string): Promise<Product> {
    const product = await this.productsService.findOneById(id);
    if (!product) {
      throw new NotFoundException(id);
    }
    return product;
  }

  @Query(returns => [Product])
  products(@Args() data: PaginationInput): Promise<Product[]> {
    return this.productsService.findAll();
  }

  @Mutation(returns => Product)
  async addProduct(
    @Args('productInput') productInput: ProductInput,
  ): Promise<Product> {
    const data = productInputToDto(productInput);
    const product = await this.productsService.create(data);
    return product;
  }
  
  @Mutation(returns => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('productInput') productInput: ProductInput,
  ): Promise<Product> {
    const data = productInputToDto(productInput);
    const product = await this.productsService.update(id, data);
    return product;
  }

  
  @ResolveProperty("restaurant", () => Restaurant)
  async restaurant(@Parent() product: ProductDto): Promise<Restaurant> {
    const { restaurantId } = product;
    return this.restaurantDataLoader.load(restaurantId);
  }
  // @Mutation(returns => Boolean)
  // async removeProduct(@Args('id') id: string) {
  //   return this.productsService.remove(id);
  // }

  // @Subscription(returns => Product)
  // productAdded() {
  //   return pubSub.asyncIterator('productAdded');
  // }
}
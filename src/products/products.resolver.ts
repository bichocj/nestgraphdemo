import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription } from '@nestjs/graphql';
// import { PubSub } from 'apollo-server-express';
// import { ProductsArgs } from './dto/products.args';


import { ProductInput } from './dto/graphql/product-input';
import { Product } from './dto/graphql/product.model';
import { ProductsService } from './products.service';
import { productInputToModel } from './transformers';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';

@Resolver(of => Product)
export class ProductsResolver {
  constructor(private readonly productsService: ProductsService) { }

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
    const data = productInputToModel(productInput);
    const product = await this.productsService.create(data);
    return product;
  }
  
  @Mutation(returns => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('productInput') productInput: ProductInput,
  ): Promise<Product> {
    const data = productInputToModel(productInput);
    const product = await this.productsService.update(id, data);
    return product;
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
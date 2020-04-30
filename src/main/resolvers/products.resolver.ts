import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, ResolveProperty, Parent } from '@nestjs/graphql';

import { ProductsService } from '../services/products.service';
import { CategoriesService } from '../services/categories.service';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { Product, Restaurant, ProductExtra } from '../dto/graphql/outputs';
import { ProductInput } from '../dto/graphql/inputs';
import { productInputToDto } from '../dto/transformers';
import { RestaurantDataLoader, CategoryDataLoader } from './dataloaders';
import { ProductDto } from 'src/dataAccess/dto';
import { GqlAuthGuard } from 'src/auth/gql-auth-guard';
import { RestaurantsService } from '../services/restaurants.service';

@Resolver(of => Product)
@UseGuards(GqlAuthGuard)
export class ProductsResolver {
  constructor(
    private readonly productsService: ProductsService,
    private readonly categoriesService: CategoriesService,
    private readonly restaurantsService: RestaurantsService,
    private readonly restaurantDataLoader: RestaurantDataLoader,
    private readonly categoryDataLoader: CategoryDataLoader
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
    @Args('input') input: ProductInput,
  ): Promise<Product> {
    const data = productInputToDto(input);
    await this.validateRelations(data);
    const product = await this.productsService.create(data);
    return product;
  }

  @Mutation(returns => Product)
  async updateProduct(
    @Args('id') id: string,
    @Args('input') input: ProductInput,
  ): Promise<Product> {
    const data = productInputToDto(input);
    await this.validateRelations(data);
    const product = await this.productsService.update(id, data);
    return product;
  }

  @Mutation(returns => Boolean)
  async removeProduct(@Args('id') id: string) {
    // TODO validate if no have relation with some order
    return this.productsService.remove(id);
  }


  @ResolveProperty("extras", () => [ProductExtra])
  async extras(@Parent() product: ProductDto): Promise<ProductExtra[]> {
    const { extras } = product;
    const productsIds = extras.map(extra => extra['productId'])
    const items = await this.productsService.findAll({ '_id': { $in: productsIds } });
    const productExtras = [];
    items.forEach(item => {
      const { price } = extras.find(e => e['productId'] == item.id)
      const productExtra: ProductExtra = new ProductExtra();
      productExtra.productId = item.id;
      productExtra.name = item.name;
      productExtra.price = price
      productExtras.push(productExtra);
    })
    return productExtras;
  }


  @ResolveProperty("restaurant", () => Restaurant)
  async restaurant(@Parent() product: ProductDto): Promise<Restaurant> {
    const { restaurantId } = product;
    return this.restaurantDataLoader.load(restaurantId);
  }

  @ResolveProperty("category", () => Restaurant)
  async category(@Parent() product: ProductDto): Promise<Restaurant> {
    const { categoryId } = product;
    return this.categoryDataLoader.load(categoryId);
  }

  async validateRelations(data: ProductInput) {
    const category = await this.categoriesService.findOneById(data.categoryId);
    const restaurant = await this.restaurantsService.findOneById(data.restaurantId);
    if (restaurant === null) {
      throw Error('el restaurante indicado no existe');
    }
    if (category === null) {
      throw Error('la categoria indicada no existe');
    }
    if (!category.isActive) {
      throw Error('la categoria indicada no esta activa');
    }
  }
}
import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Subscription, Parent, ResolveField, ResolveProperty } from '@nestjs/graphql';
// import { PubSub } from 'apollo-server-express';
// import { RestaurantsArgs } from './dto/restaurants.args';


import { RestaurantInput } from './dto/graphql/entities.inputs';
import { Restaurant, User } from './dto/graphql/entities.model';
import { RestaurantsService } from './restaurants.service';
import { restaurantInputToModel } from './dto/transformers';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { ProductsService } from 'src/main/products.service';
import { OwnerDataLoader } from './dataloaders';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly productsService: ProductsService,
    private readonly ownerDataLoader: OwnerDataLoader
  ) { }

  @Query(returns => Restaurant)
  async restaurant(@Args('id') id: string): Promise<Restaurant> {
    const restaurant = await this.restaurantsService.findOneById(id);
    if (!restaurant) {
      throw new NotFoundException(id);
    }
    return restaurant;
  }

  @Query(returns => [Restaurant])
  restaurants(@Args() data: PaginationInput): Promise<Restaurant[]> {
    return this.restaurantsService.findAll();
  }

  @Mutation(returns => Restaurant)
  async addRestaurant(
    @Args('restaurantInput') restaurantInput: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToModel(restaurantInput);
    const restaurant = await this.restaurantsService.create(data);
    return restaurant;
  }

  @Mutation(returns => Restaurant)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('restaurantInput') restaurantInput: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToModel(restaurantInput);
    const restaurant = await this.restaurantsService.update(id, data);
    return restaurant;
  }

  // @Mutation(returns => Boolean)
  // async removeRestaurant(@Args('id') id: string) {
  //   return this.restaurantsService.remove(id);
  // }

  // @Subscription(returns => Restaurant)
  // restaurantAdded() {
  //   return pubSub.asyncIterator('restaurantAdded');
  // }

  @ResolveField()
  async products(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.productsService.findAll({ restaurantId: id });
  }
  
  @ResolveProperty("owner", () => User)
  async owner(@Parent() restaurant: Restaurant): Promise<User> {
    const { id } = restaurant;
    return this.ownerDataLoader.load(restaurant.id);
  }

}
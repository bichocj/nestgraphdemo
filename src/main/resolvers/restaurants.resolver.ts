import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Parent, ResolveField, ResolveProperty } from '@nestjs/graphql';
import { RestaurantInput } from '../dto/graphql/inputs';
import { Restaurant, User } from '../dto/graphql/outputs';
import { RestaurantsService } from '../services/restaurants.service';
import { restaurantInputToDto } from '../dto/transformers';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { ProductsService } from 'src/main/services/products.service';
import { OwnerDataLoader } from './dataloaders';
import { GqlAuthGuard } from 'src/auth/gql-auth-guard';
import { CurrentUser } from 'src/auth/decorators';

@Resolver(of => Restaurant)
@UseGuards(GqlAuthGuard)
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
  restaurants(
    @Args() data: PaginationInput,
    @CurrentUser() user: User
  ): Promise<Restaurant[]> {    
    return this.restaurantsService.findAll();
  }

  @Mutation(returns => Restaurant)
  async addRestaurant(
    @Args('input') input: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToDto(input);
    const restaurant = await this.restaurantsService.create(data);
    return restaurant;
  }

  @Mutation(returns => Restaurant)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('input') input: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToDto(input);
    const restaurant = await this.restaurantsService.update(id, data);
    return restaurant;
  }

  @Mutation(returns => Boolean)
  async removeRestaurant(@Args('id') id: string) {
    return this.restaurantsService.remove(id);
  }
  
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
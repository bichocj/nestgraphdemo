import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver, Parent, ResolveField, ResolveProperty } from '@nestjs/graphql';
import { RestaurantInput, RestaurantUserInput, UserRol } from '../dto/graphql/inputs';
import { Restaurant, User, RestaurantUser } from '../dto/graphql/outputs';
import { RestaurantsService } from '../services/restaurants.service';
import { restaurantInputToDto } from '../dto/transformers';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { ProductsService } from 'src/main/services/products.service';
import { UserDataLoader } from './dataloaders';
import { GqlAuthGuard } from 'src/auth/gql-auth-guard';
import { CurrentUser } from 'src/auth/decorators';
import { UsersService } from '../services/users.service';
import { RestaurantUserDto } from 'src/dataAccess/dto';

@Resolver(of => Restaurant)
export class RestaurantsResolver {
  constructor(
    private readonly restaurantsService: RestaurantsService,
    private readonly productsService: ProductsService,
    private readonly usersService: UsersService,
    private readonly userDataLoader: UserDataLoader
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

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Restaurant)
  async addRestaurant(
    @Args('input') input: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToDto(input);
    const restaurant = await this.restaurantsService.create(data);
    return restaurant;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Restaurant)
  async updateRestaurant(
    @Args('id') id: string,
    @Args('input') input: RestaurantInput,
  ): Promise<Restaurant> {
    const data = restaurantInputToDto(input);
    const restaurant = await this.restaurantsService.update(id, data);
    return restaurant;
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Boolean)
  async removeRestaurant(@Args('id') id: string) {
    return this.restaurantsService.remove(id);
  }

  @ResolveField()
  async products(@Parent() restaurant: Restaurant) {
    const { id } = restaurant;
    return this.productsService.findAll({ restaurantId: id });
  }

  @UseGuards(GqlAuthGuard)
  @Mutation(returns => Boolean)
  async addUserToRestaurant(@Args('input') input: RestaurantUserInput) {
    const { userId, restaurantId, type } = input;

    const restaurant = await this.restaurantsService.findOneById(restaurantId);
    if (restaurant === null) {
      throw Error('el restaurant indicado no existe')
    }

    const userExists = restaurant.users.find(u => `${u.userId}` === `${userId}`)
    if (userExists) {
      throw Error('el usuario ya esta agregado al restaurante')
    }

    const user = await this.usersService.findOneById(userId);
    if (user === null) {
      throw Error('el usuario indicado no existe')
    }

    const restaurantUserDto = new RestaurantUserDto({ userId, rol: UserRol[type] });
    return await this.restaurantsService.addUser(restaurantId, restaurantUserDto);
  }

  @ResolveProperty("users", () => User)
  async users(@Parent() restaurant: Restaurant) {
    const restaurantFound = await this.restaurantsService.findOneById(restaurant.id);    
    return restaurantFound.users.map(restaurantUser => {
      const user = this.userDataLoader.load(restaurantUser.userId);
      return {
        user,
        rol: restaurantUser.rol
      }
    })

  }

}
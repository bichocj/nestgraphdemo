export interface IDataLoader<K, V> {
  load(id: K): Promise<V>;
}

import DataLoader from 'dataloader';
import { User, Restaurant, Category } from '../dto/graphql/outputs';
import { RestaurantsService } from '../services/restaurants.service';
import { CategoriesService } from '../services/categories.service';
import { UsersService } from '../services/users.service';


export class RestaurantDataLoader implements IDataLoader<string, Restaurant> {
  constructor(private readonly dataLoader: DataLoader<string, Restaurant>) { }

  public static async create(restaurantsService: RestaurantsService): Promise<RestaurantDataLoader> {
    const dataLoader = new DataLoader<string, Restaurant>(async keys => {
      const loadedEntities = await restaurantsService.findAll({ '_id': { $in: keys } });
      return keys.map(key => loadedEntities.find(entity => `${entity.id}` === `${key}`));
    });

    return new RestaurantDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}

export class CategoryDataLoader implements IDataLoader<string, Category> {
  constructor(private readonly dataLoader: DataLoader<string, Category>) { }

  public static async create(service: CategoriesService): Promise<CategoryDataLoader> {
    const dataLoader = new DataLoader<string, Category>(async keys => {
      const loadedEntities = await service.findAll({ '_id': { $in: keys } });
      return keys.map(key => loadedEntities.find(entity => `${entity.id}` === `${key}`));
    });

    return new CategoryDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}


export class UserDataLoader implements IDataLoader<string, User> {
  constructor(private readonly dataLoader: DataLoader<string, User>) { }

  public static async create(service: UsersService): Promise<UserDataLoader> {
    const dataLoader = new DataLoader<string, User>(async keys => {
      const loadedEntities = await service.findAll({ '_id': { $in: keys } });
      return keys.map(key => loadedEntities.find(entity => `${entity.id}` === `${key}`));
    });

    return new UserDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}
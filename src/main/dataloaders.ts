export interface IDataLoader<K, V> {
  load(id: K): Promise<V>;
}

import DataLoader from 'dataloader';
import { ProductsService } from './products.service';
import { User } from './dto/graphql/entities.model';

export class OwnerDataLoader implements IDataLoader<string, User> {
  constructor(private readonly dataLoader: DataLoader<string, User>) {}

  public static async create(productsService: ProductsService): Promise<OwnerDataLoader> {
    const dataLoader = new DataLoader<string, User>(async keys => {
      const loadedEntities = [{
        id: 'mockId',
        username: 'mockUsername',
      }];
      // return keys.map(key => loadedEntities.find(entity => entity.id === key));
      return keys.map(key => loadedEntities.find(entity => loadedEntities[0])); // sort by keys
    });

    return new OwnerDataLoader(dataLoader);
  }

  public async load(id: string) {
    return this.dataLoader.load(id);
  }
}
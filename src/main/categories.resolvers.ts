import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoriesService } from './categories.service';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { Category } from './dto/graphql/outputs';
import { CategoryInput } from './dto/graphql/inputs';
import { categoryInputToDto } from './dto/transformers';

@Resolver(of => Category)
export class CategoriesResolver {
  constructor(private readonly categorysService: CategoriesService) { }

  @Query(returns => Category)
  async category(@Args('id') id: string): Promise<Category> {
    const category = await this.categorysService.findOneById(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return category;
  }

  @Query(returns => [Category])
  categorys(@Args() data: PaginationInput): Promise<Category[]> {
    return this.categorysService.findAll();
  }

  @Mutation(returns => Category)
  async addCategory(
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<Category> {
    const data = categoryInputToDto(categoryInput);
    const category = await this.categorysService.create(data);
    return category;
  }

  @Mutation(returns => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('categoryInput') categoryInput: CategoryInput,
  ): Promise<Category> {
    const data = categoryInputToDto(categoryInput);
    const category = await this.categorysService.update(id, data);
    return category;
  }

  // @Mutation(returns => Boolean)
  // async removeCategory(@Args('id') id: string) {
  //   return this.categorysService.remove(id);
  // }

  // @Subscription(returns => Category)
  // categoryAdded() {
  //   return pubSub.asyncIterator('categoryAdded');
  // }
}
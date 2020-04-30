import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { CategoriesService } from '../services/categories.service';
import { PaginationInput } from 'src/common/dto/graphql/pagination-input';
import { Category } from '../dto/graphql/outputs';
import { CategoryInput } from '../dto/graphql/inputs';
import { categoryInputToDto } from '../dto/transformers';
import { GqlAuthGuard } from 'src/auth/gql-autt-guard';

@Resolver(of => Category)
@UseGuards(GqlAuthGuard)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Query(returns => Category)
  async category(@Args('id') id: string): Promise<Category> {
    const category = await this.categoriesService.findOneById(id);
    if (!category) {
      throw new NotFoundException(id);
    }
    return category;
  }

  @Query(returns => [Category])
  categories(@Args() data: PaginationInput): Promise<Category[]> {
    return this.categoriesService.findAll();
  }

  @Mutation(returns => Category)
  async addCategory(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<Category> {
    const data = categoryInputToDto(categoryInput);
    const category = await this.categoriesService.create(data);
    return category;
  }

  @Mutation(returns => Category)
  async updateCategory(
    @Args('id') id: string,
    @Args('input') categoryInput: CategoryInput,
  ): Promise<Category> {
    const data = categoryInputToDto(categoryInput);
    const category = await this.categoriesService.update(id, data);
    return category;
  }

  @Mutation(returns => Boolean)
  async removeCategory(@Args('id') id: string) {
    return this.categoriesService.remove(id);
  }

}
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../dto/graphql/outputs';
import { UserInput } from '../dto/graphql/inputs';
import { userInputToDto } from '../dto/transformers';
import * as bcryptjs from 'bcryptjs';
import { UserDto } from 'src/dataAccess/dto';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(returns => User)
  async addUser(
    @Args('input') input: UserInput,
  ): Promise<User> {
    const { username, password } = userInputToDto(input);
    const passwordHashed = await bcryptjs.hash(password, 10);
    const user = await this.usersService.create(new UserDto({ id: undefined, username, password: passwordHashed }));
    return user;
  }

}
import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UsersService } from '../services/users.service';
import { User } from '../dto/graphql/outputs';
import { UserInput } from '../dto/graphql/inputs';
import { userInputToDto } from '../dto/transformers';
import * as bcryptjs from 'bcryptjs';

@Resolver(of => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Mutation(returns => User)
  async addUser(
    @Args('userInput') userInput: UserInput,
  ): Promise<User> {
    const { username, password } = userInputToDto(userInput);
    const userExists = await this.usersService.findOne({ username });
    if (userExists) {
      throw Error('username is already in use');
    }
    const passwordHashed = await bcryptjs.hash(password, 10);
    const user = await this.usersService.create({ id: undefined, username, password: passwordHashed });
    return user;
  }

}
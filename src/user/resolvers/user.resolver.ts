import {
  Args,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';
import { User } from '../entities/User.entity';
import { UserDataInput } from '../inputs/user-data.input';
import { UserService } from '../services/user.service';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  public async getUsers(): Promise<User[]> {
    return this.userService.getUsers();
  }

  @Mutation(() => User, { name: 'createUser' })
  public async createUser(@Args('data') data: UserDataInput): Promise<User> {
    return this.userService.createUser(data);
  }

  @ResolveField()
  async records(@Parent() user: User) {
    return await this.userService.getRecords(user.id);
  }
}

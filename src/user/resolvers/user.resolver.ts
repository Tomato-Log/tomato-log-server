import { Query, Resolver } from '@nestjs/graphql';
import { User } from '../entities/User.entity';

@Resolver(() => User)
export class UserResolver {
    // constructor 에서 service 불러와
    @Query(() => [User], {name: 'users'})
    public async getUsers(): Promise<User[]> {
        return 
    }
}

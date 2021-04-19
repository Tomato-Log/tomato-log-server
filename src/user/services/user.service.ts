import { Injectable } from "@nestjs/common";
import { User } from "../entities/User.entity";

@Injectable()
export class UserService {
    // constructor

    public async getUsers(): Promise<User[]> {
        return User.find();
    }

    public async createUser(data: {something: number, something2: number}): Promise<User> {
        const { something, something2} = data;
        const user = User.create();
        user.something = something;
        user.something2 = something2;
        return user.save();
    }
}
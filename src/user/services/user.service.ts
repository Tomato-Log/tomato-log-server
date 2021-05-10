import { Injectable } from "@nestjs/common";
import { UserInputError } from "apollo-server-express";
import { ERROR_MESSAGE } from "src/core/error";
import { User } from "../entities/User.entity";
import { UserDataInput } from "../inputs/user-data.input";

@Injectable()
export class UserService {
    // constructor

    public async getUsers(): Promise<User[]> {
        return User.find();
    }

    public async createUser(data: UserDataInput): Promise<User> {
        await this.validateInput(data);
        const user = User.create({
            iCloudKeyChain: data.iCloudKeyChain,
            nickname: data.nickname,
            profileImageUrl: data.profileImageUrl,
        });
        return user.save();
    }

    private async validateInput(data: UserDataInput): Promise<void> {
        const userList = await User.find({ iCloudKeyChain: data.iCloudKeyChain })
        if (userList.length) {
            if (userList[0].nickname === data.nickname) {
                throw new UserInputError(ERROR_MESSAGE.nicknameDuplicated);
            } else {
                throw new UserInputError(ERROR_MESSAGE.userAlreadyExists);
            }
        }
    }
}
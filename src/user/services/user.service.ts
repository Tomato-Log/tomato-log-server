import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserInputError } from 'apollo-server-express';
import { ERROR_MESSAGE } from 'src/core/error';
import { Record } from 'src/record/entities/record.entity';
import { Repository } from 'typeorm';
import { User } from '../entities/User.entity';
import { UserDataInput } from '../inputs/user-data.input';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Record)
    private recordRepository: Repository<Record>,
  ) {}

  public async getUsers(): Promise<User[]> {
    return User.find();
  }

  public async createUser(data: UserDataInput): Promise<User> {
    await this.validateInput(data);
    const user = User.create({
      iCloudKeyChain: data.iCloudKeyChain,
      nickname: data.nickname,
    });
    return user.save();
  }

  private async validateInput(data: UserDataInput): Promise<void> {
    const userList = await User.find({ iCloudKeyChain: data.iCloudKeyChain });
    if (userList.length) {
      if (userList[0].nickname === data.nickname) {
        throw new UserInputError(ERROR_MESSAGE.nicknameDuplicated);
      } else {
        throw new UserInputError(ERROR_MESSAGE.userAlreadyExists);
      }
    }
  }

  public async getRecords(id: number): Promise<Record[]> {
    return await this.recordRepository.find({ where: { user: id } });
  }
}

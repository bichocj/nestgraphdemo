import { Injectable } from '@nestjs/common';
import { UserInterface } from 'src/dataAccess/interfaces';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userDocumentToDto } from '../dto/transformers';
import { UserDto } from 'src/dataAccess/dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private entity: Model<UserInterface>) { }

  async create(data: UserDto): Promise<UserDto> {
    let created = new this.entity(data);
    created = await created.save();
    const user = userDocumentToDto(created);
    return user;
  }

  async findOne(where = {}): Promise<UserDto | null> {
    const user = await this.entity.findOne(where);
    if (user) {
      return userDocumentToDto(user);
    }
    return null;
  }

  async findOneById(_id: string): Promise<UserDto> {
    return await this.findOne({ _id });
  }

  async findAll(where = {}): Promise<UserDto[]> {
    const items = await this.entity.find(where).exec();
    return items.map(item => userDocumentToDto(item))
  }
}
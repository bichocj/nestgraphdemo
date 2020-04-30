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

  async findOne(where = {}): Promise<UserDto | undefined> {
    const user = await this.entity.findOne(where);
    if (user) {
      return userDocumentToDto(user);
    }
    return undefined
  }
}
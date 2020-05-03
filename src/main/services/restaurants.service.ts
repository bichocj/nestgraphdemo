import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantDocument } from '../../dataAccess/interfaces';
import { RestaurantDto, RestaurantUserDto } from '../../dataAccess/dto';
import { restaurantDocumentToDto } from '../dto/transformers';


@Injectable()
export class RestaurantsService {
  constructor(@InjectModel('Restaurant') private entity: Model<RestaurantDocument>) { }

  async create(data: RestaurantDto): Promise<RestaurantDto> {
    let created = new this.entity(data);
    created = await created.save();
    const restaurant = restaurantDocumentToDto(created);
    return restaurant;
  }

  async update(_id: string, data: RestaurantDto): Promise<RestaurantDto> {
    const updatedRestaurant = await this.entity.findOneAndUpdate({ _id }, data, { new: true });
    return restaurantDocumentToDto(updatedRestaurant);
  }

  async findOneById(id: string): Promise<RestaurantDto> {
    const item = await this.entity.findOne({ _id: id }).exec();
    if (item) {
      return restaurantDocumentToDto(item);
    }
    return null;
  }

  async findAll(where = {}): Promise<RestaurantDto[]> {
    const items = await this.entity.find(where).exec();
    return items.map(item => restaurantDocumentToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.entity.findByIdAndRemove(id);
    return true;
  }

  async addUser(_id: string, restaurantUserDto: RestaurantUserDto): Promise<boolean> {
    await this.entity.update(
      { _id },
      { $push: { users: restaurantUserDto } },
    );
    return true;
  }
}
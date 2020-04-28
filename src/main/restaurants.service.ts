import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantInterface } from '../dataAccess/interfaces';
import { RestaurantDto } from '../dataAccess/dto';
import { restaurantInterfaceToDto } from './dto/transformers';


@Injectable()
export class RestaurantsService {
  constructor(@InjectModel('Restaurant') private RestaurantDto: Model<RestaurantInterface>) { }

  async create(data: RestaurantDto): Promise<RestaurantDto> {
    let created = new this.RestaurantDto(data);
    created = await created.save();
    const restaurant = restaurantInterfaceToDto(created);
    return restaurant;
  }

  async update(_id: string, data: RestaurantDto): Promise<RestaurantDto> {
    const updatedRestaurant = await this.RestaurantDto.findOneAndUpdate({ _id }, data, { new: true });
    return restaurantInterfaceToDto(updatedRestaurant);
  }

  async findOneById(id: string): Promise<RestaurantDto> {
    const item = await this.RestaurantDto.findOne({ _id: id }).exec();
    return restaurantInterfaceToDto(item);
  }

  async findAll(): Promise<RestaurantDto[]> {
    const items = await this.RestaurantDto.find().exec();
    return items.map(item => restaurantInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.RestaurantDto.findByIdAndRemove(id);
    return true;
  }
}
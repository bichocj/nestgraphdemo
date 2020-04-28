import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantInterface } from '../dataAccess/interfaces';
import { RestaurantDto } from '../dataAccess/dto';
import { restaurantInterfaceToDto } from './dto/transformers';


@Injectable()
export class RestaurantsService {
  constructor(@InjectModel('Restaurant') private entity: Model<RestaurantInterface>) { }

  async create(data: RestaurantDto): Promise<RestaurantDto> {
    let created = new this.entity(data);
    created = await created.save();
    const restaurant = restaurantInterfaceToDto(created);
    return restaurant;
  }

  async update(_id: string, data: RestaurantDto): Promise<RestaurantDto> {
    const updatedRestaurant = await this.entity.findOneAndUpdate({ _id }, data, { new: true });
    return restaurantInterfaceToDto(updatedRestaurant);
  }

  async findOneById(id: string): Promise<RestaurantDto> {
    const item = await this.entity.findOne({ _id: id }).exec();
    return restaurantInterfaceToDto(item);
  }

  async findAll(where={}): Promise<RestaurantDto[]> {
    console.log('where')
    console.log(where)
    const items = await this.entity.find(where).exec();
    return items.map(item => restaurantInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.entity.findByIdAndRemove(id);
    return true;
  }
}
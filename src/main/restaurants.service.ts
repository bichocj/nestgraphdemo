import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RestaurantInterface } from '../dataAccess/interfaces/restaurant.interface';
import { RestaurantModel } from '../dataAccess/models/restaurant.model';
import { restaurantInterfaceToModel } from './dto/transformers';


@Injectable()
export class RestaurantsService {
  constructor(@InjectModel('Restaurant') private restaurantModel: Model<RestaurantInterface>) { }

  async create(data: RestaurantModel): Promise<RestaurantModel> {
    let created = new this.restaurantModel(data);
    created = await created.save();
    const restaurant = restaurantInterfaceToModel(created);
    return restaurant;
  }

  async update(_id: string, data: RestaurantModel): Promise<RestaurantModel> {
    const updatedRestaurant = await this.restaurantModel.findOneAndUpdate({ _id }, data, { new: true });
    return restaurantInterfaceToModel(updatedRestaurant);
  }

  async findOneById(id: string): Promise<RestaurantModel> {
    const item = await this.restaurantModel.findOne({ _id: id }).exec();
    return restaurantInterfaceToModel(item);
  }

  async findAll(): Promise<RestaurantModel[]> {
    const items = await this.restaurantModel.find().exec();
    return items.map(item => restaurantInterfaceToModel(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.restaurantModel.findByIdAndRemove(id);
    return true;
  }
}
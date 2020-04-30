import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from '../../dataAccess/interfaces';
import { CategoryDto } from '../../dataAccess/dto';
import { categoryInterfaceToDto } from '../dto/transformers';


@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private entity: Model<CategoryInterface>) { }

  async create(data: CategoryDto): Promise<CategoryDto> {
    let created = new this.entity(data);
    // try {
      created = await created.save();
      const restaurant = categoryInterfaceToDto(created);
      return restaurant;
    // } catch {
      // throw Error('zas!');
    // }
  }

  async update(_id: string, data: CategoryDto): Promise<CategoryDto> {
    const updatedCategory = await this.entity.findOneAndUpdate({ _id }, data, { new: true });
    return categoryInterfaceToDto(updatedCategory);
  }

  async findOneById(id: string): Promise<CategoryDto> {
    const item = await this.entity.findOne({ _id: id }).exec();
    return categoryInterfaceToDto(item);
  }

  async findAll(): Promise<CategoryDto[]> {
    const items = await this.entity.find().exec();
    return items.map(item => categoryInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.entity.findByIdAndRemove(id);
    return true;
  }
}
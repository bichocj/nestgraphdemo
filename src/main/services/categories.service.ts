import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryDocument } from '../../dataAccess/interfaces';
import { CategoryDto } from '../../dataAccess/dto';
import { categoryInterfaceToDto } from '../dto/transformers';


@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private entity: Model<CategoryDocument>) { }

  async create(data: CategoryDto): Promise<CategoryDto> {
    let created = new this.entity(data);
    created = await created.save();
    const restaurant = categoryInterfaceToDto(created);
    return restaurant;
  }

  async update(_id: string, data: CategoryDto): Promise<CategoryDto> {
    const updatedCategory = await this.entity.findOneAndUpdate({ _id }, data, { new: true });
    return categoryInterfaceToDto(updatedCategory);
  }

  async findOneById(id: string): Promise<CategoryDto> {
    const item = await this.entity.findOne({ _id: id }).exec();
    if (item) {
      return categoryInterfaceToDto(item);
    }
    return null;
  }

  async findAll(where={}): Promise<CategoryDto[]> {
    const items = await this.entity.find(where).exec();
    return items.map(item => categoryInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.entity.findByIdAndRemove(id);
    return true;
  }
}
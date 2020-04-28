import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CategoryInterface } from '../dataAccess/interfaces';
import { CategoryDto } from '../dataAccess/dto';
import { categoryInterfaceToDto } from './dto/transformers';


@Injectable()
export class CategoriesService {
  constructor(@InjectModel('Category') private CategoryDto: Model<CategoryInterface>) { }

  async create(data: CategoryDto): Promise<CategoryDto> {
    let created = new this.CategoryDto(data);
    created = await created.save();
    const restaurant = categoryInterfaceToDto(created);
    return restaurant;
  }

  async update(_id: string, data: CategoryDto): Promise<CategoryDto> {
    const updatedCategory = await this.CategoryDto.findOneAndUpdate({ _id }, data, { new: true });
    return categoryInterfaceToDto(updatedCategory);
  }

  async findOneById(id: string): Promise<CategoryDto> {
    const item = await this.CategoryDto.findOne({ _id: id }).exec();
    return categoryInterfaceToDto(item);
  }

  async findAll(): Promise<CategoryDto[]> {
    const items = await this.CategoryDto.find().exec();
    return items.map(item => categoryInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.CategoryDto.findByIdAndRemove(id);
    return true;
  }
}
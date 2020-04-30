import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument } from '../../dataAccess/interfaces';
import { ProductDto } from '../../dataAccess/dto';
import { productInterfaceToDto } from '../dto/transformers';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private entity: Model<ProductDocument>) { }

  async create(data: ProductDto): Promise<ProductDto> {
    let created = new this.entity(data);
    created = await created.save();
    const product = productInterfaceToDto(created);
    return product;
  }

  async update(_id: string, data: ProductDto): Promise<ProductDto> {
    const updatedProduct = await this.entity.findOneAndUpdate({ _id }, data, { new: true });
    return productInterfaceToDto(updatedProduct);
  }

  async findOneById(id: string): Promise<ProductDto> {
    const item = await this.entity.findOne({ _id: id }).exec();
    return productInterfaceToDto(item);
  }

  async findAll(where = {}): Promise<ProductDto[]> {
    const items = await this.entity.find(where).exec();
    return items.map(item => productInterfaceToDto(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.entity.findByIdAndRemove(id);
    return true;
  }
}
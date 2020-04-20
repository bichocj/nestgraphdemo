import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductInterface } from './dataAccess/interfaces/product.interface';
import { ProductModel } from './dataAccess/models/product.model';
import { productInterfaceToModel } from './transformers';

@Injectable()
export class ProductsService {
  constructor(@InjectModel('Product') private productModel: Model<ProductInterface>) { }

  async create(data: ProductModel): Promise<ProductModel> {
    let created = new this.productModel(data);
    created = await created.save();
    const product = productInterfaceToModel(created);
    return product;
  }

  async update(_id: string, data: ProductModel): Promise<ProductModel> {
    const updatedProduct = await this.productModel.findOneAndUpdate({ _id }, data, { new: true });
    return productInterfaceToModel(updatedProduct);
  }

  async findOneById(id: string): Promise<ProductModel> {
    const item = await this.productModel.findOne({ _id: id }).exec();
    return productInterfaceToModel(item);
  }

  async findAll(): Promise<ProductModel[]> {
    const items = await this.productModel.find().exec();
    return items.map(item => productInterfaceToModel(item))
  }

  async remove(id: string): Promise<boolean> {
    await this.productModel.findByIdAndRemove(id);
    return true;
  }
}
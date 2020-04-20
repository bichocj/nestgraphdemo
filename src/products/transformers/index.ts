import { ProductInput } from "../dto/graphql/product-input";
import { ProductInterface } from "../dataAccess/interfaces/product.interface";
import { ProductModel } from "../dataAccess/models/product.model";

export function productInputToModel(productInput: ProductInput): ProductModel {
  const { name, description, price, cost } = productInput;
  return new ProductModel({ name, description, price, cost });
}

export function productInterfaceToModel(productInterface: ProductInterface): ProductModel {
  const { id, name, description, price, cost } = productInterface;
  return new ProductModel({ id, name, description, price, cost });
}
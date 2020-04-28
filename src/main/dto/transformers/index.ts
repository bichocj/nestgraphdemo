import { RestaurantInterface } from "src/dataAccess/interfaces/restaurant.interface";
import { RestaurantModel } from "src/dataAccess/models/restaurant.model";
import { RestaurantInput, ProductInput } from "../graphql/entities.inputs";

import { ProductInterface } from "../../../dataAccess/interfaces/product.interface";
import { ProductModel } from "../../../dataAccess/models/product.model";


export function restaurantInputToModel(restaurantInput: RestaurantInput): RestaurantModel {
  const { name, address } = restaurantInput;
  return new RestaurantModel({ name, address });
}

export function restaurantInterfaceToModel(restaurantInterface: RestaurantInterface): RestaurantModel {
  const { id, name, address } = restaurantInterface;
  return new RestaurantModel({ id, name, address });
}

export function productInputToModel(productInput: ProductInput): ProductModel {
  const { name, description, price, cost, restaurantId } = productInput;
  return new ProductModel({ name, description, price, cost, restaurantId });
}

export function productInterfaceToModel(productInterface: ProductInterface): ProductModel {
  const { id, name, description, price, cost, restaurantId } = productInterface;
  return new ProductModel({ id, name, description, price, cost, restaurantId });
}

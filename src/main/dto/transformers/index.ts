import { ProductInterface, RestaurantInterface, CategoryInterface } from "src/dataAccess/interfaces";
import { RestaurantInput, ProductInput, CategoryInput } from "../graphql/inputs";
import { ProductDto, RestaurantDto, CategoryDto } from "src/dataAccess/dto";


export function restaurantInputToDto(restaurantInput: RestaurantInput): RestaurantDto {
  const { name, address } = restaurantInput;
  return new RestaurantDto({ name, address });
}

export function restaurantInterfaceToDto(restaurantInterface: RestaurantInterface): RestaurantDto {
  const { id, name, address } = restaurantInterface;
  return new RestaurantDto({ id, name, address });
}

export function productInputToDto(productInput: ProductInput): ProductDto {
  const { name, description, price, cost, restaurantId, categoryId } = productInput;
  return new ProductDto({ name, description, price, cost, restaurantId, categoryId });
}

export function productInterfaceToDto(productInterface: ProductInterface): ProductDto {
  const { id, name, description, price, cost, restaurantId, categoryId } = productInterface;
  return new ProductDto({ id, name, description, price, cost, restaurantId, categoryId });
}

export function categoryInputToDto(categoryInput: CategoryInput): CategoryDto {
  const { name } = categoryInput;
  return new CategoryDto({ name });
}

export function categoryInterfaceToDto(categoryInterface: CategoryInterface): CategoryDto {
  const { id, name } = categoryInterface;
  return new CategoryDto({ id, name });
}

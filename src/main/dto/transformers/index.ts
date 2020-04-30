import { ProductInterface, RestaurantInterface, CategoryInterface, UserInterface } from "src/dataAccess/interfaces";
import { UserInput, RestaurantInput, ProductInput, CategoryInput } from "../graphql/inputs";
import { ProductDto, RestaurantDto, CategoryDto, UserDto } from "src/dataAccess/dto";


export function restaurantInputToDto(restaurantInput: RestaurantInput): RestaurantDto {
  const { name, address } = restaurantInput;
  return new RestaurantDto({ name, address });
}

export function restaurantInterfaceToDto(restaurantInterface: RestaurantInterface): RestaurantDto {
  const { id, name, address } = restaurantInterface;
  return new RestaurantDto({ id, name, address });
}

export function productInputToDto(productInput: ProductInput): ProductDto {
  const { name, description, price, cost, restaurantId, categoryId, extras } = productInput;
  return new ProductDto({ name, description, price, cost, restaurantId, categoryId, extras });
}

export function productInterfaceToDto(productInterface: ProductInterface): ProductDto {
  const { id, name, description, price, cost, restaurantId, categoryId, extras } = productInterface;
  return new ProductDto({ id, name, description, price, cost, restaurantId, categoryId, extras });
}

export function categoryInputToDto(categoryInput: CategoryInput): CategoryDto {
  const { name } = categoryInput;
  return new CategoryDto({ name });
}

export function categoryInterfaceToDto(categoryInterface: CategoryInterface): CategoryDto {
  const { id, name } = categoryInterface;
  return new CategoryDto({ id, name });
}


export function userInputToDto(userInput: UserInput): UserDto {
  const { username, password } = userInput;
  return new UserDto({ id: undefined, username, password });
}

export function userInterfaceToDto(userInterface: UserInterface): UserDto {
  const { id, username, password } = userInterface;
  return new UserDto({ id, username, password });
}

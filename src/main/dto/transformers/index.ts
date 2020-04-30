import { ProductDocument, RestaurantDocument, CategoryDocument, UserInterface } from "src/dataAccess/interfaces";
import { UserInput, RestaurantInput, ProductInput, CategoryInput } from "../graphql/inputs";
import { ProductDto, RestaurantDto, CategoryDto, UserDto } from "src/dataAccess/dto";


export function restaurantInputToDto(restaurantInput: RestaurantInput): RestaurantDto {
  const { name, address, isActive, isPublished } = restaurantInput;
  return new RestaurantDto({ name, address, isActive, isPublished });
}

export function restaurantDocumentToDto(restaurantInterface: RestaurantDocument): RestaurantDto {
  const { id, name, address, isActive, isPublished } = restaurantInterface;
  return new RestaurantDto({ id, name, address, isActive, isPublished });
}

export function productInputToDto(productInput: ProductInput): ProductDto {
  const { name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished } = productInput;
  return new ProductDto({ name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished });
}

export function productDocumentToDto(productInterface: ProductDocument): ProductDto {
  const { id, name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished } = productInterface;
  return new ProductDto({ id, name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished });
}

export function categoryInputToDto(categoryInput: CategoryInput): CategoryDto {
  const { name, isActive, isPublished } = categoryInput;
  return new CategoryDto({ name, isActive, isPublished });
}

export function categoryDocumentToDto(categoryInterface: CategoryDocument): CategoryDto {
  const { id, name, isActive, isPublished } = categoryInterface;
  return new CategoryDto({ id, name, isActive, isPublished });
}


export function userInputToDto(userInput: UserInput): UserDto {
  const { username, password } = userInput;
  return new UserDto({ id: undefined, username, password });
}

export function userDocumentToDto(userInterface: UserInterface): UserDto {
  const { id, username, password } = userInterface;
  return new UserDto({ id, username, password });
}

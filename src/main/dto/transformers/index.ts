import { ProductDocument, RestaurantDocument, CategoryDocument, UserInterface } from "src/dataAccess/interfaces";
import { UserInput, RestaurantInput, ProductInput, CategoryInput } from "../graphql/inputs";
import { ProductDto, RestaurantDto, CategoryDto, UserDto } from "src/dataAccess/dto";


export function restaurantInputToDto(restaurantInput: RestaurantInput): RestaurantDto {
  const { name, address, photo, isActive, isPublished } = restaurantInput;
  return new RestaurantDto({ name, address, photo, isActive, isPublished });
}

export function restaurantDocumentToDto(document: RestaurantDocument): RestaurantDto {
  const { id, name, address, users, isActive, isPublished } = document;
  const dto = new RestaurantDto({ id, name, address, isActive, isPublished });
  dto.users = users;
  return dto;
}

export function productInputToDto(productInput: ProductInput): ProductDto {
  const { name, description, photo, price, cost, restaurantId, categoryId, extras, isPrimary, isActive, isPublished } = productInput;
  return new ProductDto({ name, description, photo, price, cost, restaurantId, categoryId, extras, isPrimary, isActive, isPublished });
}

export function productDocumentToDto(productInterface: ProductDocument): ProductDto {  
  const { id, name, description, photo, price, cost, restaurantId, categoryId, extras, isPrimary, isActive, isPublished } = productInterface;
  return new ProductDto({ id, name, description, photo, price, cost, restaurantId, categoryId, extras, isPrimary, isActive, isPublished });
}

export function categoryInputToDto(categoryInput: CategoryInput): CategoryDto {
  const { name, photo, isActive, isPublished } = categoryInput;
  return new CategoryDto({ name, photo, isActive, isPublished });
}

export function categoryDocumentToDto(categoryInterface: CategoryDocument): CategoryDto {
  const { id, name, photo, isActive, isPublished } = categoryInterface;
  return new CategoryDto({ id, name, photo, isActive, isPublished });
}


export function userInputToDto(userInput: UserInput): UserDto {
  const { username, password } = userInput;
  return new UserDto({ id: undefined, username, password });
}

export function userDocumentToDto(userInterface: UserInterface): UserDto {
  const { id, username, password, isSuperUser } = userInterface;
  const dto = new UserDto({ id, username, password });
  dto.isSuperUser = isSuperUser;
  return dto;
}

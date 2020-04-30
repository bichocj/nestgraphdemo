import { ProductDocument, RestaurantInterface, CategoryDocument, UserInterface } from "src/dataAccess/interfaces";
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
  const { name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished  } = productInput;
  return new ProductDto({ name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished  });
}

export function productInterfaceToDto(productInterface: ProductDocument): ProductDto {
  const { id, name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished  } = productInterface;
  return new ProductDto({ id, name, description, price, cost, restaurantId, categoryId, extras, isActive, isPublished  });
}

export function categoryInputToDto(categoryInput: CategoryInput): CategoryDto {
  const { name, isActive, isPublished } = categoryInput;
  return new CategoryDto({ name, isActive, isPublished });
}

export function categoryInterfaceToDto(categoryInterface: CategoryDocument): CategoryDto {
  const { id, name, isActive, isPublished } = categoryInterface;
  return new CategoryDto({ id, name, isActive, isPublished });
}


export function userInputToDto(userInput: UserInput): UserDto {
  const { username, password } = userInput;
  return new UserDto({ id: undefined, username, password });
}

export function userInterfaceToDto(userInterface: UserInterface): UserDto {
  const { id, username, password } = userInterface;
  return new UserDto({ id, username, password });
}

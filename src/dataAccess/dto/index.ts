export class CategoryDto {
  id: string;
  name: string;
  isActive: boolean;
  isPublished: boolean;
  constructor({ id = undefined, name, isActive=true, isPublished=true }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.isActive = isActive;
    this.isPublished = isPublished;
  }
}

export class ProductDto {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  restaurantId: string;
  categoryId: string;
  extras: [];  
  isActive: boolean;
  isPublished: boolean;
  constructor({ id = undefined, name, description, price, cost, restaurantId, categoryId, extras, isActive=true, isPublished=true }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.cost = cost;
    this.restaurantId = restaurantId;
    this.categoryId = categoryId;
    this.extras = extras;
    
    this.isActive = isActive;
    this.isPublished = isPublished;
  }

}

export class RestaurantDto {
  id: string;
  name: string;
  address: string;
  constructor({ id = undefined, name, address }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.address = address;
  }
}


export class UserDto {
  id: string;
  username: string;
  password: string;

  constructor({ id = undefined, username, password = undefined }) {
    if (id) {
      this.id = id;
    }
    this.username = username;
    this.password = password;
  }

}

export class CategoryDto {
  id: string;
  name: string;
  constructor({ id = undefined, name }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
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
  constructor({ id = undefined, name, description, price, cost, restaurantId, categoryId }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.cost = cost;
    this.restaurantId = restaurantId;
    this.categoryId = categoryId;
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
  constructor({ id = undefined, username }) {
    if (id) {
      this.id = id;
    }
    this.username = username;
  }

}

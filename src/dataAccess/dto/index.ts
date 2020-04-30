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
  extras: [];
  constructor({ id = undefined, name, description, price, cost, restaurantId, categoryId, extras }) {
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

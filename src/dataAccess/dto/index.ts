export class CategoryDto {
  id: string;
  name: string;
  photo: string;
  isActive: boolean;
  isPublished: boolean;
  constructor({ id = undefined, name, photo, isActive = true, isPublished = true }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.photo = photo;
    this.isActive = isActive;
    this.isPublished = isPublished;
  }
}

export class ProductDto {
  id: string;
  name: string;
  description: string;
  photo: string;
  price: number;
  cost: number;
  restaurantId: string;
  categoryId: string;
  extras: [];
  isPrimary: boolean;
  isActive: boolean;
  isPublished: boolean;
  constructor({ id = undefined, name, description, photo, price, cost, restaurantId, categoryId, extras, isPrimary = true, isActive = true, isPublished = true }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.photo = photo;
    this.price = price;
    this.cost = cost;
    this.restaurantId = restaurantId;
    this.categoryId = categoryId;
    this.extras = extras;
    this.isPrimary = isPrimary;

    this.isActive = isActive;
    this.isPublished = isPublished;
  }

}

export class RestaurantUserDto {
  userId: string;
  rol: string;
  constructor({ userId, rol }) {
    this.userId = userId;
    this.rol = rol;
  }
}

export class RestaurantDto {
  id: string;
  name: string;
  address: string;
  users: [any];
  isActive: boolean;
  isPublished: boolean;
  constructor({ id = undefined, name, address, isActive = true, isPublished = true }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.address = address;

    this.isActive = isActive;
    this.isPublished = isPublished;
  }
}


export class UserDto {
  id: string;
  username: string;
  password: string;
  isSuperUser: boolean;

  constructor({ id = undefined, username, password = undefined }) {
    if (id) {
      this.id = id;
    }
    this.username = username;
    this.password = password;
  }

}

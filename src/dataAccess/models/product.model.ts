export class ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  restaurantId: string;
  constructor({ id = undefined, name, description, price, cost, restaurantId }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.cost = cost;
    this.restaurantId = restaurantId;
  }

}

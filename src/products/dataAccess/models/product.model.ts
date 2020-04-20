export class ProductModel {
  id: string;
  name: string;
  description: string;
  price: number;
  cost: number;
  constructor({ id = undefined, name, description, price, cost }) {
    if (id) {
      this.id = id;
    }
    this.name = name;
    this.description = description;
    this.price = price;
    this.cost = cost;
  }

}

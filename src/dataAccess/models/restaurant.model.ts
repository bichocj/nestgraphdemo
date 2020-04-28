export class RestaurantModel {
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

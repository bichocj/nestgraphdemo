export class UserModel {
  id: string;
  username: string;
  constructor({ id = undefined, username }) {
    if (id) {
      this.id = id;
    }
    this.username = name;
  }

}

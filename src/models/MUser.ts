import { IUser } from '../interfaces//user/IUser';

export default class MUser {
  public id?: string | undefined;
  public name: string;
  public lastName: string;
  public email: string;
  public photo: string;
  public phone: string;
  public age: number;

  constructor(user: IUser) {
    this.id = user.id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.photo = user.photo;
    this.phone = user.phone;
    this.age = user.age;
  }
}

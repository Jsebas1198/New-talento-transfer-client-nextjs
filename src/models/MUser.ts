import { IUser } from '../interfaces//user/IUser';

export default class MUser {
  public _id: string;
  public name: string;
  public lastName: string;
  public email: string;
  public photo: string;
  public phone: string;
  public age: number;

  constructor(user: IUser) {
    this._id = user._id;
    this.name = user.name;
    this.lastName = user.lastName;
    this.email = user.email;
    this.photo = user.photo;
    this.phone = user.phone;
    this.age = user.age;
  }
}

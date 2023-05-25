import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../config/axios';
import { ICreateUser } from '../interfaces/user/ICreateUser';
import { IHttpResponse } from '../interfaces/user/IHttpResponse';
import { ERequestContentType } from '../enums/ERequestContentType';
import MUser from '../models/MUser';
import { IUpdateUser } from '../interfaces/user/IUpdateUser';

export default class UserService {
  /**
   * @description Obtiene los usuarios de la base de datos
   * @returns {Promise<MUser[]>}
   */
  public static async getUsers(): Promise<MUser[]> {
    try {
      const { data: categoriesResponse }: AxiosResponse<MUser[]> = await axiosInstance.get(
        '/users'
      );

      return categoriesResponse.map((user) => new MUser(user));
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Crea un Usuario
   * @param {ICreateProduct} createValues Valores de la cración del usuario
   * @returns {Promise<MUser>}
   */
  public static async create(createValues: ICreateUser): Promise<MUser> {
    try {
      const { name, lastName, email, photo, phone, age } = createValues;

      const requestData = {
        name,
        lastName,
        email,
        phone,
        age,
        photo: photo || null,
      };

      const { data: createResponse }: AxiosResponse<IHttpResponse<MUser>> =
        await axiosInstance.post('users', requestData, {
          headers: {
            'content-type': ERequestContentType.JSON,
          },
        });

      return createResponse.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

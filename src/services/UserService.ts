import axios, { AxiosResponse } from 'axios';
import axiosInstance from '../config/axios';
import { ICreateUser } from '../interfaces/user/ICreateUser';
import { IHttpResponse } from '../interfaces/user/IHttpResponse';
import { ERequestContentType } from '../enums/ERequestContentType';
import MUser from '../models/MUser';
import { IUpdateUser } from '../interfaces/user/IUpdateUser';
import { IUser } from '../interfaces/user/IUser';

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
   * @description Busca un usuario pro su ID
   * @param {string} userId ID del usuario que se va a buscar
   * @returns {Promise<MUser>}
   */
  public static async getUserById(userId: string): Promise<MUser> {
    try {
      const { data: userResponse }: AxiosResponse<IHttpResponse<IUser>> = await axiosInstance.get(
        `/users/${userId}`
      );
      return new MUser(userResponse.data);
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Crea un Usuario
   * @param {ICreateUser} createValues Valores de la cración del usuario
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

  /**
   * @description Actualiza un usuario
   * @param {IUpdateUser} changes Datos del usuario que se van a actualizar
   * @param {string} userId ID del usuario que se va a actualizar
   * @returns {Promise<any>}
   */
  public static async updateUser(changes: IUpdateUser, userId: string): Promise<any> {
    try {
      const { name, lastName, email, photo, phone, age } = changes;

      const newData = { name, lastName, email, phone, age, photo: photo || null };
      const { data: updateResponse }: AxiosResponse<IHttpResponse<any>> = await axiosInstance.put(
        `users/${userId}`,
        newData,
        {
          headers: {
            'content-type': ERequestContentType.JSON,
          },
        }
      );

      return updateResponse.data;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  /**
   * @description Elimina a un Usuario
   * @param {number} userId ID del usuario que se va a eliminar
   * @returns {Promise<null>}
   */
  public static async deleteUser(userId: string): Promise<null> {
    try {
      await axiosInstance.delete(`/users/${userId}`);
      return null;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export interface IHttpResponse<T> {
  data: T;
  message: string;
  success: boolean;
  errorCode: number;
  error: null | unknown;
}

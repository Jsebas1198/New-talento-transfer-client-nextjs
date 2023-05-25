import { toast } from 'react-toastify';

/**
 * @param {any} err Error
 * @param {string[]} errors Errores
 */
export function handlerCatchError(err: any, errors: string[]) {
  if (err?.response?.data?.errorCode && err?.response?.data?.errorCode > 0) {
    toast(errors[err.response.data.errorCode - 1], { type: 'error' });
    return;
  }

  toast('Error inesperado, intente más tarde', { type: 'error' });
}

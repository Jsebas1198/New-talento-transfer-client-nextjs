/**
 * @description Formate el objeto a un formato valido de los props de nextjs
 * @param obj Objecto a comvertir
 * @returns {Object}
 */
export const parseObjectsProps = (obj: Object): Object => {
  return JSON.parse(JSON.stringify(obj));
};

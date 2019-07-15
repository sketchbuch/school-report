// @flow

import { getItemById } from '../utils/arrays';

export const getActiveId = (params: { [key: string]: string }, param: string): string | typeof undefined => {
  return params[param] || undefined;
};

const getDomainRec = (
  domainDefault: Object,
  domainObjects: Object[],
  params: { [key: string]: string },
  param: string
): Object => {
  return {
    ...domainDefault,
    ...getItemById(domainObjects, getActiveId(params, param)),
  };
};

export default getDomainRec;

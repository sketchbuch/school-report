// @flow

import md5 from 'md5';

export const generateId = (txtStr: string, ts: number): string => {
  return md5(txtStr + ts);
};

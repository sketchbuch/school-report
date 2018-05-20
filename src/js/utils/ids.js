// @flow

import md5 from 'md5';


/**
* Returns an md5 ID string using a prefix appended with a timestamp.
*
* @param string txtStr The text to be used in creating the MD5 hash.
* @param number ts The timestamp to be used in creating the MD5 hash.
* @return string The new ID, a MD5 hash of txtStr + ts.
*/
export function generateId(txtStr: string, ts: number): string {
  return md5(txtStr + ts);
}

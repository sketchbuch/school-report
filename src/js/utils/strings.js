// @flow

/**
 * Returns the str with the first letter upercased.
 *
 * @param str string The str to uppercase.
 * @return string
 */
export function ucFirst(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/**
 * Returns the str, cropped if too long and ellipses added.
 *
 * @param str string The str to crop.
 * @param len integer The length that the string should be cropped to.
 * @param ellipsize boolean should ellipsis be added?
 * @return string
 */
export function cropStr(str: string, len: number, ellipsize?: boolean = true): string {
  let trimmedStr = str.trim();
  const cropLen = parseInt(len, 10);
  const ellipsis = ellipsize ? '…' : '';

  if (cropLen < 1 || trimmedStr.length <= cropLen) {
    return trimmedStr;
  }
  return `${trimmedStr.substr(0, cropLen)}${ellipsis}`;
}

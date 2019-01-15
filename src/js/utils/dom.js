// @flow

/**
 * Returns a custom number prop (CSS var) from the html element.
 *
 * @param { string } prop The name of the prop to get.
 * @param { string } prop The name of the prop to get.
 * @return { integer } The prop value or null.
 */
export function getCustomNumProp(prop: string, styleObj?: Object): number {
  let val = 0;

  if (styleObj === undefined) {
    val = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue(prop);
  } else {
    val = styleObj[prop];
  }

  return parseInt(val, 10);
}

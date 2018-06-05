// @flow


/**
* Returns a custom prop (CSS var) from the html element.
*
* @param string prop The name of the prop to get.
* @return string The prop value or null.
*/
export function getCustomNumProp(prop: string): number {
  return parseInt(getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue(prop), 10);
}

// @flow

export function getCustomNumProp(prop: string, styleObj?: Object): number {
  let val = 0;

  if (styleObj === undefined) {
    val = getComputedStyle(document.getElementsByTagName('html')[0]).getPropertyValue(prop);
  } else {
    val = styleObj[prop];
  }

  return parseInt(val, 10);
}

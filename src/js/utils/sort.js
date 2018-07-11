// @flow

/**
* Returns an array of objects sorted a-z by prop.
*
* @prop array arr An array of objects.
* @prop array props An array of props to sort against.
* @return array A copy of arr sorted by prop.
*/
export function sortObjectsAz(arr: Array<Object>, props: Array<string>): Array<Object> {
  if (arr.length < 1 || props.length < 1) return arr;

  return [].concat(arr).sort((a, b) => {
    var labelA = getSortProp(a, props);
    var labelB = getSortProp(b, props);
    return (labelA < labelB) ? -1 : (labelA > labelB) ? 1 : 0;
  });
}

/**
* Returns an array of objects sorted z-a by prop.
*
* @prop array arr An array of objects.
* @prop array props An array of props to sort against.
* @return array A copy of arr sorted by prop.
*/
export function sortObjectsZa(arr: Array<Object>, props: Array<string>): Array<Object> {
  return sortObjectsAz(arr, props).reverse();
}

/**
* Returns a string to compare against.
*
* @prop array arrObj An object that needs comparing for sorting.
* @prop array props An array of props to sort against.
* @return string propstr The string used to compare the objects in a sort function.
*/
function getSortProp(arrObj: Object, props: Array<string>): string {
  let propstr = '';
  props.forEach((prop) => propstr += arrObj[prop]);

  return propstr.toLowerCase();
}

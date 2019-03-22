// @flow

export function sortObjectsAz(arr: Object[], props: string[]): Object[] {
  if (arr.length < 1 || props.length < 1) {
    return arr;
  }

  return [].concat(arr).sort((a: Object, b: Object) => {
    var labelA: string = getSortProp(a, props);
    var labelB: string = getSortProp(b, props);
    return labelA < labelB ? -1 : labelA > labelB ? 1 : 0;
  });
}

export function sortObjectsZa(arr: Object[], props: string[]): Object[] {
  return sortObjectsAz(arr, props).reverse();
}

function getSortProp(arrObj: Object, props: string[]): string {
  let propstr: string = '';
  props.forEach((prop: string) => arrObj[prop] !== undefined && (propstr += arrObj[prop]));

  return propstr.toLowerCase();
}

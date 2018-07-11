// @flow

/**
* Returns the a matching object from an array with an id equal to itemId.
*
* @param array reports An array of objects with - at least - a property called 'id'.
* @param string itemId The id of the object looked for.
* @param string idProp The property containing the ID. Defaults to 'id'.
* @return object Either the matching object or an empty object.
*/
export function getItemById(itemArr: Array<Object>, itemId: string, idProp?: string = 'id'): Object {
  if (itemId !== '' && itemArr.length > 0) {
    const match = itemArr.filter(item => item[idProp] === itemId).shift();
    if (match) return match;
  }

  return {};
}

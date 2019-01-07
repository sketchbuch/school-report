// @flow

/**
 * Returns a copy of state with a new element added.
 *
 * @param array state The array to add to.
 * @param mixed newEle The element to add.
 * @return array An updated copy of state.
 */
export function addItem(state: Array<any>, newEle: any): Array<any> {
  return [...state.slice(0)].concat(newEle);
}

/**
 * Returns a copy of state with the element moved.
 *
 * @param array state The array containing the items.
 * @param mixed theEle The element to move.
 * @param integer fromIndex The index of theEle.
 * @param integer toIndex The index to move theEle to.
 * @return array An updated copy of state.
 */
export function moveItem(
  state: Array<any>,
  newEle: any,
  fromIndex: number,
  toIndex: number
): Array<any> {
  const newState = [
    ...state.slice(0, fromIndex),
    ...state.slice(fromIndex + 1),
  ];

  return [...newState.slice(0, toIndex), newEle, ...newState.slice(toIndex)];
}

/**
 * Returns a copy of state with a new element inserted.
 *
 * @param array state The array to add to.
 * @param mixed newEle The element to add.
 * @param integer arrIndex The index to insert newEle at.
 * @return array An updated copy of state.
 */
export function insertItem(
  state: Array<any>,
  newEle: any,
  arrIndex: number
): Array<any> {
  return [...state.slice(0, arrIndex), newEle, ...state.slice(arrIndex)];
}

/**
 * Returns a copy of state with the element at arrIndex removed.
 *
 * @param array state The array that contains the element to delete.
 * @param integer arrIndex The index to be removed.
 * @return array An updated copy of state.
 */
export function removeItem(state: Array<any>, arrIndex: number): Array<any> {
  return [...state.slice(0, arrIndex), ...state.slice(arrIndex + 1)];
}

/**
 * Returns a copy of state with the element at arrIndex updated to newEle.
 *
 * @param array state The array that contains the element to update.
 * @param integer arrIndex The index to be updated.
 * @param mixed newEle The element to update.
 * @return array An updated copy of state.
 */
export function updateItem(
  state: Array<any>,
  arrIndex: number,
  newEle: any
): Array<any> {
  return [...state.slice(0, arrIndex), newEle, ...state.slice(arrIndex + 1)];
}

/**
 * Returns a copy of state with a new element added if it doesn't already exist.
 *
 * @param array state The array to add to.
 * @param mixed newEle The element to add.
 * @return array An updated copy of state.
 */
export function addObj(state: Array<Object>, newEle: any): Array<any> {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex < 0) {
    return addItem(state, newEle);
  }

  return state;
}

/**
 * Returns a copy of state with the element at arrIndex removed.
 *
 * @param array state The array to add to.
 * @param mixed newEle The element to add.
 * @return array An updated copy of state.
 */
export function removeObj(state: Array<Object>, newEle: any): Array<any> {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex >= 0) {
    return removeItem(state, eleIndex);
  }

  return state;
}

/**
 * Returns a copy of state with the element matching newEle updated.
 *
 * @param array state The array that contains the element to update.
 * @param mixed newEle The element to update.
 * @return array An updated copy of state.
 */
export function updateObj(state: Array<Object>, newEle: any): Array<any> {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex >= 0) {
    return updateItem(state, eleIndex, newEle);
  }

  return state;
}

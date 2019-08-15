// @flow

// TODO - fix types

export const addItem = (state: Array<any>, newEle: any): Array<any> => {
  return [...state.slice(0)].concat(newEle);
};

export const moveItem = (state: Array<any>, newEle: any, fromIndex: number, toIndex: number): Array<any> => {
  const newState = [...state.slice(0, fromIndex), ...state.slice(fromIndex + 1)];

  return [...newState.slice(0, toIndex), newEle, ...newState.slice(toIndex)];
};

export const insertItem = (state: Array<any>, newEle: any, arrIndex: number): Array<any> => {
  return [...state.slice(0, arrIndex), newEle, ...state.slice(arrIndex)];
};

export const removeItem = (state: Array<any>, arrIndex: number): Array<any> => {
  return [...state.slice(0, arrIndex), ...state.slice(arrIndex + 1)];
};

export const updateItem = (state: Array<any>, arrIndex: number, newEle: any): Array<any> => {
  return [...state.slice(0, arrIndex), newEle, ...state.slice(arrIndex + 1)];
};

export const addObj = (state: Array<Object>, newEle: any): Array<any> => {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex < 0) {
    return addItem(state, newEle);
  }

  return state;
};

export const removeObj = (state: Array<Object>, newEle: any): Array<any> => {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex >= 0) {
    return removeItem(state, eleIndex);
  }

  return state;
};

export const updateObj = (state: Array<Object>, newEle: any): Array<any> => {
  let eleIndex = state.findIndex(ele => ele.id === newEle.id);
  if (eleIndex >= 0) {
    return updateItem(state, eleIndex, newEle);
  }

  return state;
};

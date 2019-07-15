// @flow

export const getItemById = (itemArr: Object[] = [], itemId: string = '', idProp?: string = 'id'): Object | {} => {
  if (itemId !== '' && itemArr.length > 0) {
    const match = itemArr.filter((item: Object) => item[idProp] === itemId).shift();
    if (match) {
      return match;
    }
  }

  return {};
};

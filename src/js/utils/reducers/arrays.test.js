// @flow

import {
  addItem,
  addObj,
  removeItem,
  removeObj,
  updateItem,
  updateObj,
} from './array';

/**
 * Reducer Array Tests
 */

describe('Util/Reducers: Arrays', () => {
  test('addItem() correctly adds an element', () => {
    const newEle = 'test1';
    const initialState = [];
    const expectedState = [newEle];
    expect(addItem(initialState, newEle)).toEqual(expectedState);
  });

  test('removeItem() correctly removes an element', () => {
    const initialState = ['a', 'b', 'c'];
    const expectedState = ['a', 'c'];
    expect(removeItem(initialState, 1)).toEqual(expectedState);
  });

  test('updateItem() correctly updates an element', () => {
    const newEle = 'd';
    const initialState = ['a', 'b', 'c'];
    const expectedState = ['a', newEle, 'c'];
    expect(updateItem(initialState, 1, newEle)).toEqual(expectedState);
  });

  test('addObj() correctly adds an object', () => {
    const newObj = { id: 4 };
    const initialState = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedState = [{ id: 1 }, { id: 2 }, { id: 3 }, newObj];
    expect(addObj(initialState, newObj)).toEqual(expectedState);
    expect(addObj(initialState, { id: 2 })).toEqual(initialState);
  });

  test('removeObj() correctly removes an object', () => {
    const initialState = [{ id: 1 }, { id: 2 }, { id: 3 }];
    const expectedState = [{ id: 1 }, { id: 3 }];
    expect(removeObj(initialState, { id: 2 })).toEqual(expectedState);
    expect(removeObj(initialState, { id: 10 })).toEqual(initialState);
  });

  test('updateObj() correctly updates an object', () => {
    const updatedObj = { id: 2, label: 'Item 3' };
    const initialState = [
      { id: 1, label: 'Item 1' },
      { id: 2, label: 'Item 2' },
      { id: 3, label: 'Item 3' },
    ];
    const expectedState = [
      { id: 1, label: 'Item 1' },
      updatedObj,
      { id: 3, label: 'Item 3' },
    ];
    expect(updateObj(initialState, updatedObj)).toEqual(expectedState);
    expect(updateObj(initialState, { id: 10, label: 'Item 10' })).toEqual(
      initialState
    );
  });
});

// @flow

import { getItemById } from '../arrays';


/**
* Array Tests
*/

describe('Util: Arrays', () => {
  const ID = 'object1';
  const testObject = { id: ID, label: 'Object 1' };
  const testArray = [
    { id: 'object3', label: 'Object 3' },
    {...testObject},
    { id: 'object2', label: 'Object 2' },
    { id: 'object4', label: 'Object 4' },
  ];

  test('getItemById() returns the matching object', () => {
    expect(getItemById(testArray, ID)).toEqual(testObject);
  });

  test('getItemById() handles no match correctly', () => {
    const WRONG_ID = 'objectA';
    expect(getItemById(testArray, WRONG_ID)).toEqual({});
    expect(getItemById([], WRONG_ID)).toEqual({});
  });
});

// @flow

import classDefault from '../../types/class';
import type { ClassType } from '../../types/class';
import { getItemById } from '../arrays';

describe('Util: Arrays', () => {
  const ID: string = 'object1';
  const testObject: ClassType = { ...classDefault, id: ID, label: 'Object 1' };
  const testArray: ClassType[] = [
    { ...classDefault, id: 'object3', label: 'Object 3' },
    { ...testObject },
    { ...classDefault, id: 'object2', label: 'Object 2' },
    { ...classDefault, id: 'object4', label: 'Object 4' },
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

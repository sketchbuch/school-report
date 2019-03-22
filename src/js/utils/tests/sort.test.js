// @flow

import { sortObjectsAz, sortObjectsZa } from '../sort';
import type { ClassType } from '../../types/class';
import classDefault from '../../types/class';

/**
 * Sort Tests
 */

describe('Util: sort', () => {
  const testArr: ClassType[] = [
    { ...classDefault, label: 'b' },
    { ...classDefault, label: 'a' },
    { ...classDefault, label: 'd' },
    { ...classDefault, label: 'c' },
  ];

  test('sortObjectsAz() should return the array sorted a-z', () => {
    const expectedArr: ClassType[] = [
      { ...classDefault, label: 'a' },
      { ...classDefault, label: 'b' },
      { ...classDefault, label: 'c' },
      { ...classDefault, label: 'd' },
    ];

    expect(sortObjectsAz(testArr, ['label'])).toEqual(expectedArr);
  });

  test('sortObjectsAz() handles empty arrays correctly', () => {
    expect(sortObjectsAz(testArr, [])).toEqual(testArr);
    expect(sortObjectsAz([], ['label'])).toEqual([]);
  });

  test('sortObjectsZa() should return the array sorted z-a', () => {
    const expectedArr: ClassType[] = [
      { ...classDefault, label: 'd' },
      { ...classDefault, label: 'c' },
      { ...classDefault, label: 'b' },
      { ...classDefault, label: 'a' },
    ];

    expect(sortObjectsZa(testArr, ['label'])).toEqual(expectedArr);
  });
});

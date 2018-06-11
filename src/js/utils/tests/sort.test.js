// @flow

import { sortObjectsAz, sortObjectsZa } from '../sort';


/**
* Sort Tests
*/

describe('Util: sort', () => {
  const testArr = [
    { label: 'b', },
    { label: 'a', },
    { label: 'd', },
    { label: 'c', },
  ];

  test('sortObjectsAz() should return the array sorted a-z', () => {
    const expectedArr = [
      { label: 'a', },
      { label: 'b', },
      { label: 'c', },
      { label: 'd', },
    ];

    expect(sortObjectsAz(testArr, ['label'])).toEqual(expectedArr);
  });

  test('sortObjectsAz() handles empty arrays correctly', () => {
    expect(sortObjectsAz(testArr, [])).toEqual(testArr);
    expect(sortObjectsAz([], ['label'])).toEqual([]);
  });

  test('sortObjectsZa() should return the array sorted z-a', () => {
    const expectedArr = [
      { label: 'd', },
      { label: 'c', },
      { label: 'b', },
      { label: 'a', },
    ];

    expect(sortObjectsZa(testArr, ['label'])).toEqual(expectedArr);
  });
});

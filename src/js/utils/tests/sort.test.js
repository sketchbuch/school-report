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
    const sortedArr = sortObjectsAz(testArr, ['label']);

    expect(sortedArr[0].label).toEqual('a');
    expect(sortedArr[sortedArr.length - 1].label).toEqual('d');
    expect(sortedArr).toHaveLength(4);
  });

  test('sortObjectsZa() should return the array sorted z-a', () => {
    const sortedArr = sortObjectsZa(testArr, ['label']);

    expect(sortedArr[0].label).toEqual('d');
    expect(sortedArr[sortedArr.length - 1].label).toEqual('a');
    expect(sortedArr).toHaveLength(4);
  });
});

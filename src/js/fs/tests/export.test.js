// @flow

import { getDateFromTs } from '../export';


/**
* FS Export Tests
*/

describe('FS: Export:', () => {
  test('getDateFromTs() should return a formatted date string', () => {
    const ts = Date.now();
    const result = getDateFromTs(ts);
    expect(getDateFromTs(ts)).toBe(result); // Test that both calls return the same
    expect(getDateFromTs(1536092102000)).toBe('04/09/2018'); // Fixed test
  });
});

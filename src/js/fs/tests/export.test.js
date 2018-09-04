// @flow

import { getDateFromTs } from '../export';


/**
* FS Export Tests
*/

describe('FS: Export:', () => {
  test('getDateFromTs() should return a formatted date string', () => {
    expect(getDateFromTs(1536092102000)).toBe('04/09/2018');
  });
});

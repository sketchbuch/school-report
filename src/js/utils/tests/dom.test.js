// @flow

import { getCustomNumProp } from '../dom';


/**
* ID Tests
*/

describe('Util: DOM', () => {
  test('getCustomNumProp() should return an integer', () => {
    const prop = '--header-height';
    const styleObj = { [prop]: '70' };

    expect(getCustomNumProp(prop, styleObj)).toBe(70);
  });
});

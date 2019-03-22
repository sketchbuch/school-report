// @flow

import { getCustomNumProp } from '../dom';

describe('Util: DOM', () => {
  test('getCustomNumProp() should return an integer', () => {
    const prop: string = '--header-height';
    const styleObj: { [key: string]: string } = { [prop]: '70' };

    expect(getCustomNumProp(prop, styleObj)).toBe(70);
  });
});

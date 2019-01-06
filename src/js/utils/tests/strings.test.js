// @flow

import { cropStr, ucFirst } from '../strings';

/**
 * String Tests
 */

describe('Util: strings', () => {
  test('ucFirst() should capitalise the first letter of a string', () => {
    expect(ucFirst('test')).toBe('Test');
  });

  test('cropStr() should crop strings correctly', () => {
    expect(cropStr('abcdefghijklmnopqrstuvwxyz', 10)).toBe('abcdefghij…');
    expect(cropStr('abcde', 10)).toBe('abcde');
    expect(cropStr('abcdefghij', 10)).toBe('abcdefghij');
    expect(cropStr('abcdefghijklmnopqrstuvwxyz', 10, false)).toBe('abcdefghij');
  });
});

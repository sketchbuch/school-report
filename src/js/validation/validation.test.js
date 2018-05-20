// @flow

/**
* Validation Tests
*/

import validate from './validation';

describe('Util: validation', () => {
  const field = 'label';

  test('validate() should return true if no errors', () => {
    expect(validate(field, {}, {})).toBe(true);
  });

  test('validate() should return false if there are errors', () => {
    expect(validate(field, { label: 'something' }, { label: true })).toBe(false);
  });
});

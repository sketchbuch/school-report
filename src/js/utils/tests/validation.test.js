// @flow

import validate from '../validation';

/**
 * Validation Tests
 */

describe('Util: validation', () => {
  const field = 'label';

  test('validate() should return true upon no errors', () => {
    expect(validate(field, {}, {})).toBe(true);
  });

  test('validate() should return false upon errors', () => {
    expect(validate(field, { label: 'something' }, { label: true })).toBe(
      false
    );
  });
});

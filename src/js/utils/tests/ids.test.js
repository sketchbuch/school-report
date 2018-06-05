// @flow

import { generateId } from '../ids';


/**
* ID Tests
*/

describe('Util: IDs', () => {
  const ts = Date.now();
  const idstr = 'An ID';

  test('generateId() returns the same MD5 hash given the same arguments', () => {
    expect(generateId(idstr, ts)).toBe(generateId(idstr, ts));
  });

  test('generateId() returns different MD5 hashes given different arguments', () => {
    expect(generateId('a', ts)).not.toBe(generateId('b', ts));
    expect(generateId(idstr, 12345678)).not.toBe(generateId(idstr, 45678910));
    expect(generateId('a', 12345678)).not.toBe(generateId('b', 45678910));
  });
});

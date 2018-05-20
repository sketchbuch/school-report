// @flow

import classDefault, { ClassFactory, getClassIdStr } from '../class';
import { generateId } from '../../utils/ids';

describe('Types: Class', () => {
  const classObj = {
    ...classDefault,
    created: -1,
    label: 'Latimer Yr. 1',
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getClassIdStr(classObj);
  const id = generateId(idStr, ts);
  const testClass = {
    ...classDefault,
    created: ts,
    id: id,
    label: 'Latimer Yr. 1',
    updated: ts,
  };

  test('ClassFactory() correctly returns a new class object', () => {
    const newClassObj = ClassFactory(classObj, ts);
    expect(JSON.stringify(newClassObj)).toEqual(JSON.stringify(testClass));
    expect(newClassObj.created).toBe(newClassObj.updated);
  });

  test('getClassIdStr() returns the same string given the same object', () => {
    const idStrCompare = getClassIdStr(classObj);
    expect(idStr).toEqual(idStrCompare);
  });
});

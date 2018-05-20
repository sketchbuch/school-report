// @flow

import categoryDefault, { CategoryFactory, getCategoryIdStr } from '../category';
import { generateId } from '../../utils/ids';

describe('Types: Class', () => {
  const categoryObj = {
    ...categoryDefault,
    created: -1,
    label: 'Category 1',
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getCategoryIdStr(categoryObj);
  const id = generateId(idStr, ts);
  const testClass = {
    ...categoryDefault,
    created: ts,
    id: id,
    label: 'Category 1',
    updated: ts,
  };

  test('CategoryFactory() correctly returns a new category object', () => {
    const newcategoryObj = CategoryFactory(categoryObj, ts);
    expect(JSON.stringify(newcategoryObj)).toEqual(JSON.stringify(testClass));
    expect(newcategoryObj.created).toBe(newcategoryObj.updated);
  });

  test('getCategoryIdStr() returns the same string given the same object', () => {
    const idStrCompare = getCategoryIdStr(categoryObj);
    expect(idStr).toEqual(idStrCompare);
  });
});

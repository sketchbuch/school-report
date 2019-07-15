// @flow

import getDomainRec, { getActiveId } from '../domain';
import categoryDefault from '../../types/category';
import type { CategoryType } from '../../types/category';

describe('Util: Domain', () => {
  const paramName: string = 'catgeoryId';
  const paramVal: string = 'cat-2';
  const params: { [key: string]: string } = { [paramName]: paramVal };

  describe('getActiveId() :', () => {
    test('Should return undefined if param is not in params', () => {
      expect(getActiveId({}, paramName)).toBe(undefined);
    });

    test('Should return param if in params', () => {
      expect(getActiveId(params, paramName)).toBe(paramVal);
    });
  });

  describe('getDomainRec() :', () => {
    const expectedObject = { ...categoryDefault, label: 'Cat 2', id: 'cat-2' };
    const domainObjects: CategoryType[] = [
      { ...categoryDefault, label: 'Cat 1', id: 'cat-1' },
      expectedObject,
      { ...categoryDefault, label: 'Cat 3', id: 'cat-3' },
    ];

    test('Should return undefined if param is not in params', () => {
      expect(getDomainRec(categoryDefault, domainObjects, params, paramName)).toEqual(expectedObject);
    });
  });
});

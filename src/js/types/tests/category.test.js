// @flow

import categoryDefault, {
  CategoryFactory,
  getCategoryIdStr,
} from '../category';
import { ICON_CATEGORIES } from '../../constants/icons';
import { generateId } from '../../utils/ids';
import {
  ROUTE_DEL_CATEGORY,
  ROUTE_EDIT_CATEGORY,
} from '../../constants/routes';

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

  describe('Getters:', () => {
    const newCategoryObj = CategoryFactory(categoryObj, ts);

    test('getDescription() correctly returns the description', () => {
      expect(newCategoryObj.getDescription()).toEqual('');
    });

    test('getIcon() correctly returns the icon', () => {
      expect(newCategoryObj.getIcon()).toEqual(ICON_CATEGORIES);
    });

    test('getLabel() correctly returns the label', () => {
      expect(newCategoryObj.getLabel()).toEqual(newCategoryObj.label);
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newCategoryObj.getTooltip()).toEqual(newCategoryObj.label);
    });

    describe('contains()', () => {
      test('Returns false if no search term', () => {
        const result = newCategoryObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the category object does not contain the search term.', () => {
        const term = 'Chalfont';
        const result = newCategoryObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the category object contains the search term.', () => {
        const term = 'gory';
        const result = newCategoryObj.contains(term);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_DEL_CATEGORY if linkType is delete', () => {
        expect(newCategoryObj.getUrl('delete')).toBe(
          ROUTE_DEL_CATEGORY.replace(':categoryId', newCategoryObj.id)
        );
      });

      test('Returns ROUTE_EDIT_CATEGORY for any other linkType', () => {
        const expects = ROUTE_EDIT_CATEGORY.replace(
          ':categoryId',
          newCategoryObj.id
        );
        expect(newCategoryObj.getUrl()).toBe(expects);
        expect(newCategoryObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

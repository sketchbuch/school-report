// @flow

import categoryDefault, { CategoryFactory, getCategoryIdStr } from '../category';
import type { CategoryType } from '../category';
import { ICON_CATEGORIES } from '../../constants/icons';
import { ROUTE_DEL_CATEGORY, ROUTE_EDIT_CATEGORY } from '../../constants/routes';
import { generateId } from '../../utils/ids';

describe('Types: Category', () => {
  const categoryObj: CategoryType = {
    ...categoryDefault,
    created: -1,
    label: 'Category 1',
    updated: -2,
  };
  const ts: number = Date.now();
  const idStr: string = getCategoryIdStr(categoryObj);
  const id: string = generateId(idStr, ts);
  const testCategory: CategoryType = {
    ...categoryDefault,
    created: ts,
    id: id,
    label: 'Category 1',
    updated: ts,
  };

  test('CategoryFactory() correctly returns a new category object', () => {
    const newcategoryObj: CategoryType = CategoryFactory(categoryObj, ts);
    expect(JSON.stringify(newcategoryObj)).toEqual(JSON.stringify(testCategory));
    expect(newcategoryObj.created).toBe(newcategoryObj.updated);
  });

  test('getCategoryIdStr() returns the same string given the same object', () => {
    const idStrCompare: string = getCategoryIdStr(categoryObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newCategoryObj: CategoryType = CategoryFactory(categoryObj, ts);

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
        const result: boolean = newCategoryObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the category object does not begin with the search term.', () => {
        const term: string = 'Chalfont';
        const result: boolean = newCategoryObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the category object begins with the search term.', () => {
        const term: string = 'Category';
        const result: boolean = newCategoryObj.contains(term);
        expect(result).toBe(true);
      });

      test('Returns true if the category object contains the search term.', () => {
        const term: string = 'gory';
        const result: boolean = newCategoryObj.contains(term, true);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_DEL_CATEGORY if linkType is delete', () => {
        expect(newCategoryObj.getUrl('delete')).toBe(ROUTE_DEL_CATEGORY.replace(':categoryId', newCategoryObj.id));
      });

      test('Returns ROUTE_EDIT_CATEGORY for any other linkType', () => {
        const expects: string = ROUTE_EDIT_CATEGORY.replace(':categoryId', newCategoryObj.id);
        expect(newCategoryObj.getUrl()).toBe(expects);
        expect(newCategoryObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

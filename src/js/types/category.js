// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_CATEGORIES } from '../constants/icons';
import {
  ROUTE_DEL_CATEGORY,
  ROUTE_EDIT_CATEGORY,
} from '../constants/routes';

/**
* Category type def.
*/

export type CategoryType = {
  ...$Exact<DomainBaseType>,
  label: string,
};

const categoryDefault: CategoryType = {
  ...domainBaseDefault,
  label: '',
};

export const categorySort = ['label', 'updated'];

/**
* Returns an object of CategoryType based on categoryObj but with additional props set.
*
* @param CategoryType categoryObj The initial category object.
* @param number ts A timestamp used for the id, created, and updated.
* @return CategoryType The new category object.
*/
export function CategoryFactory(categoryObj: CategoryType, ts: number): CategoryType {
  const newObj = hydrateCategory({
    ...categoryObj,
    created: ts,
    updated: ts,
    id: generateId(getCategoryIdStr(categoryObj), ts),
  });

  return newObj;
}

/**
* Returns an updated categoryObj with getters.
*
* @param CategoryType categoryObj The category object.
* @return CategoryType The hydrated category object.
*/
export function hydrateCategory(categoryObj: CategoryType): CategoryType {
  return {
    ...categoryDefault,
    ...categoryObj,
    contains: function (term?: string, anywhere?: boolean = false) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.label.toLowerCase();

        if (anywhere) {
          if (searchStr.indexOf(term) !== -1) {
            return true;
          }
        } else {
          if (searchStr.indexOf(term) === 0) {
            return true;
          }
        }
      }

      return false;
    },
    getDescription: function () {
      return '';
    },
    getIcon: function () {
      return ICON_CATEGORIES;
    },
    getLabel: function () {
      return this.label;
    },
    getTooltip: function () {
      return this.getLabel();
    },
    getUrl: function (linkType: string) {
      let theUrl = ROUTE_EDIT_CATEGORY;
      
      if (linkType === 'delete') theUrl = ROUTE_DEL_CATEGORY;

      return theUrl.replace(':categoryId', this.id);
    },
  };
}

/**
* Returns a string to be used when creating an ID for categories.
*
* @param CategoryType categoryObj The category record.
* @return string The string to be used in creating the ID.
*/
export function getCategoryIdStr(categoryObj: CategoryType): string {
  return 'category:' + categoryObj.label;
}

export default categoryDefault;

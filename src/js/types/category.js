// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_CATEGORIES } from '../constants/icons';
import { ROUTE_DEL_CATEGORY, ROUTE_EDIT_CATEGORY } from '../constants/routes';

export type CategoryType = {
  ...$Exact<DomainBaseType>,
  label: string,
};

const categoryDefault: CategoryType = {
  ...domainBaseDefault,
  label: '',
  type: 'category',
};

export const categorySort = ['priority', 'label', 'updated'];

export const CategoryFactory = (categoryObj: CategoryType, ts: number): CategoryType => {
  const newObj: CategoryType = hydrateCategory({ ...categoryObj });

  if (categoryObj.id !== '') {
    newObj.created = ts;
    newObj.updated = ts;
    newObj.id = generateId(getCategoryIdStr(categoryObj), ts);
  }

  return newObj;
};

export const hydrateCategory = (categoryObj: CategoryType): CategoryType => {
  return {
    ...categoryDefault,
    ...categoryObj,
    contains: function(term?: string, anywhere?: boolean = false) {
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
    getDescription: function() {
      return '';
    },
    getIcon: function() {
      return ICON_CATEGORIES;
    },
    getLabel: function() {
      return this.label;
    },
    getTooltip: function() {
      return this.getLabel();
    },
    getUrl: function(linkType: string) {
      let theUrl = ROUTE_EDIT_CATEGORY;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_CATEGORY;
      }

      return theUrl.replace(':categoryId', this.id);
    },
  };
};

export const getCategoryIdStr = (categoryObj: CategoryType): string => {
  return 'category:' + categoryObj.label;
};

export default categoryDefault;

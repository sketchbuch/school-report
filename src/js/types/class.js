// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_CLASSES } from '../constants/icons';
import { ROUTE_DEL_CLASS, ROUTE_EDIT_CLASS, ROUTE_PUPILS } from '../constants/routes';

export type ClassType = {
  ...$Exact<DomainBaseType>,
  label: string,
  pupilCount: number, // Required so that the pupil count can be calculated and set - but the actual count is never persisted - 0 will always be saved.
};

const classDefault: ClassType = {
  ...domainBaseDefault,
  label: '',
  pupilCount: 0,
};

export const classSort = ['label', 'updated'];

export function ClassFactory(classObj: ClassType, ts: number): ClassType {
  const newObj = hydrateClass({
    ...classObj,
    created: ts,
    updated: ts,
    id: generateId(getClassIdStr(classObj), ts),
  });

  return newObj;
}

export function hydrateClass(classObj: ClassType): ClassType {
  return {
    ...classDefault,
    ...classObj,
    contains: function(term?: string, anywhere?: boolean = false) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = (this.label + this.pupilCount).toLowerCase();

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
      return `(${this.pupilCount})`;
    },
    getIcon: function() {
      return ICON_CLASSES;
    },
    getLabel: function() {
      return this.label;
    },
    getTooltip: function() {
      return `${this.getLabel()} - ${this.getDescription()}`;
    },
    getUrl: function(linkType: string) {
      let theUrl = ROUTE_PUPILS;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_CLASS;
      } else if (linkType === 'edit') {
        theUrl = ROUTE_EDIT_CLASS;
      }

      return theUrl.replace(':classId', this.id);
    },
  };
}

export function getClassIdStr(classObj: ClassType): string {
  return 'class:' + classObj.label;
}

export default classDefault;

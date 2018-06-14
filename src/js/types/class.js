// @flow

import { generateId } from '../utils/ids';
import { ICON_CLASSES } from '../constants/icons';
import {
  ROUTE_DEL_CLASS,
  ROUTE_EDIT_CLASS,
  ROUTE_PUPILS,
} from '../constants/routes';


/**
* Class type def.
*/

export type ClassType = {
  contains: Function,
  created: number,
  getDescription: Function,
  getIcon: Function,
  getLabel: Function,
  getTooltip: Function,
  getUrl: Function,
  id: string,
  label: string,
  pupilCount: number, // Required so that the pupil count can be calculated and set - but the actual count is never persisted - 0 will always be saved.
  updated: number,
};

const classDefault: ClassType = {
  contains: ()=>{},
  created: -1,
  getDescription: ()=>{},
  getIcon: ()=>{},
  getLabel: ()=>{},
  getTooltip: ()=>{},
  getUrl: ()=>{},
  id: '',
  label: '',
  pupilCount: 0,
  updated: -1,
};

export const classSort = ['label', 'updated'];

/**
* Returns an object of ClassType based on classObj but with additional props set.
*
* @param ClassType classObj The initial class object.
* @param number ts A timestamp used for the id, created, and updated.
* @return ClassType The new class object.
*/
export function ClassFactory(classObj: ClassType, ts: number): ClassType {
  const newObj = hydrateClass({
    ...classObj,
    created: ts,
    updated: ts,
    id: generateId(getClassIdStr(classObj), ts),
  });

  return newObj;
}

/**
* Returns an updated classObj with getters.
*
* @param ClassType classObj The class object.
* @return ClassType The hydrated class object.
*/
export function hydrateClass(classObj: ClassType): ClassType {
  return {
    ...classDefault,
    ...classObj,
    contains: function (term?: string) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.label + this.pupilCount;
        if (term && searchStr.toLowerCase().indexOf(term) !== -1) return true;
      }

      return false;
    },
    getDescription: function () {
      return `(${this.pupilCount})`;
    },
    getIcon: function () {
      return ICON_CLASSES;
    },
    getLabel: function () {
      return this.label;
    },
    getTooltip: function () {
      return`${this.getLabel()} - ${this.getDescription()}`;
    },
    getUrl: function (linkType: string) {
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

/**
* Returns a string to be used when creating an ID for classes.
*
* @param ClassType classObj The class record.
* @return string The string to be used in creating the ID.
*/
export function getClassIdStr(classObj: ClassType): string {
  return 'class:' + classObj.label;
}

export default classDefault;

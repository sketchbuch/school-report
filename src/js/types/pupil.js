// @flow

import { generateId } from '../utils/ids';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../constants/icons';
import {
  ROUTE_EDIT_BUILDER,
  ROUTE_DEL_PUPIL,
  ROUTE_EDIT_PUPIL,
} from '../constants/routes';


/**
* Pupil type def.
*/

export type PupilType = {
  classId: string,
  contains: Function,
  created: number,
  description: string,
  firstname: string,
  gender: string,
  getDescription: Function,
  getIcon: Function,
  getLabel: Function,
  getTooltip: Function,
  getUrl: Function,
  id: string,
  lastname: string,
  updated: number,
};

const pupilDefault: PupilType = {
  classId: '',
  contains: ()=>{},
  created: -1,
  description: '',
  firstname: '',
  gender: 'm',
  getDescription: ()=>{},
  getIcon: ()=>{},
  getLabel: ()=>{},
  getTooltip: ()=>{},
  getUrl: ()=>{},
  id: '',
  lastname: '',
  updated: -1,
};

export const pupilSort = ['firstname', 'lastname', 'updated'];

/**
* Returns an object of PupilType based on pupilObj but with additional props set.
*
* @param PupilType pupilObj The initial pupil object.
* @param number ts A timestamp used for the id, created, and updated.
* @param string id The id for the pupil.
* @param string classId The id for the pupil's class.
* @return PupilType The new pupil object.
*/
export function PupilFactory(pupilObj: PupilType, ts: number, classId: string): PupilType {
  return hydratePupil({
    ...pupilObj,
    created: ts,
    updated: ts,
    classId: classId,
    id: generateId(getPupilIdStr(pupilObj), ts),
  });
}

/**
* Returns an updated pupilObj with getters.
*
* @param PupilType pupilObj The pupil object.
* @return PupilType The hydrated pupil object.
*/
export function hydratePupil(pupilObj: PupilType): PupilType {
  return {
    ...pupilDefault,
    ...pupilObj,
    contains: function (term?: string) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.firstname + this.lastname + this.description;
        if (term && searchStr.toLowerCase().indexOf(term) !== -1) return true;
      }

      return false;
    },
    getDescription: function () {
      return this.description;
    },
    getIcon: function () {
      if (this.gender === 'f') return ICON_PUPILS_FEMALE;
      return ICON_PUPILS_MALE;
    },
    getLabel: function () {
      return `${this.firstname} ${this.lastname}`;
    },
    getTooltip: function () {
      let tooltip = this.getLabel();
      let description = this.getDescription();
      if (description !== '') return `${tooltip} - ${description}`;

      return tooltip;
    },
    getUrl: function (linkType: string, reportId: string = '') {
      let theUrl = ROUTE_EDIT_PUPIL;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_PUPIL;
      } else if (linkType === 'builder') {
        theUrl = ROUTE_EDIT_BUILDER;
      }

      return theUrl.replace(':pupilId', this.id).replace(':classId', this.classId).replace(':reportId', reportId);
    },
  };
}

/**
* Returns a string to be used when creating an ID for pupils.
*
* @param PupilType pupilObj The pupil record.
* @return string The string to be used in creating the ID.
*/
export function getPupilIdStr(pupilObj: PupilType): string {
  return 'pupil:' +
    pupilObj.firstname + '_' +
    pupilObj.lastname + '_' +
    pupilObj.description + '_' +
    pupilObj.gender;
}

export default pupilDefault;

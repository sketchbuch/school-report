// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../constants/icons';
import { ROUTE_EDIT_BUILDER, ROUTE_DEL_PUPIL, ROUTE_EDIT_PUPIL } from '../constants/routes';
import { text } from '../components/Translation/Translation';

export type PupilType = {
  ...$Exact<DomainBaseType>,
  classId: string,
  description: string,
  firstname: string,
  gender: string,
  getPronoun: Function,
  lastname: string,
};

const pupilDefault: PupilType = {
  ...domainBaseDefault,
  classId: '',
  description: '',
  firstname: '',
  gender: 'm',
  getPronoun: () => {},
  lastname: '',
  type: 'pupil',
};

export const pupilSortFirst = 'firstname';
export const pupilSortLast = 'lastname';
export const pupilSortDefault = pupilSortFirst;
export const pupilSortOptions = [pupilSortFirst, pupilSortLast];
export type PupilSortOptions = typeof pupilSortFirst | typeof pupilSortLast;
export const pupilSort = {
  [pupilSortFirst]: [...pupilSortOptions, 'updated'],
  [pupilSortLast]: [pupilSortLast, pupilSortFirst, 'updated'],
};

export const PupilFactory = (pupilObj: PupilType, ts: number, classId: string): PupilType => {
  const newObj: PupilType = hydratePupil({ ...pupilObj });

  if (pupilObj.id !== '') {
    newObj.created = ts;
    newObj.updated = ts;
    newObj.classId = classId;
    newObj.id = generateId(getPupilIdStr(pupilObj), ts);
  }

  return newObj;
};

export const hydratePupil = (pupilObj: PupilType): PupilType => {
  return {
    ...pupilDefault,
    ...pupilObj,
    contains: function(term?: string, anywhere?: boolean = false, sortOrder: PupilSortOptions = pupilSortDefault) {
      if (term) {
        term = term.toLowerCase();
        let searchStr = (this.firstname + this.lastname + this.description).toLowerCase();

        if (sortOrder === pupilSortLast) {
          searchStr = (this.lastname + this.firstname + this.description).toLowerCase();
        }

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
      return this.description;
    },
    getIcon: function() {
      if (this.gender === 'f') {
        return ICON_PUPILS_FEMALE;
      }
      return ICON_PUPILS_MALE;
    },
    getLabel: function(sortOrder: PupilSortOptions = pupilSortDefault) {
      if (sortOrder === pupilSortLast) {
        return `${this.lastname}, ${this.firstname}`;
      }

      return `${this.firstname} ${this.lastname}`;
    },
    getTooltip: function(sortOrder: PupilSortOptions = pupilSortDefault) {
      let tooltip = this.getLabel(sortOrder);
      let description = this.getDescription();
      if (description !== '') {
        return `${tooltip} - ${description}`;
      }

      return tooltip;
    },
    getUrl: function(linkType: string, reportId: string = '') {
      let theUrl = ROUTE_EDIT_PUPIL;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_PUPIL;
      } else if (linkType === 'builder') {
        theUrl = ROUTE_EDIT_BUILDER;
      }

      return theUrl
        .replace(':pupilId', this.id)
        .replace(':classId', this.classId)
        .replace(':reportId', reportId);
    },
    getPronoun(ph: string) {
      switch (ph) {
        case 'PS':
        case 'PO':
        case 'PP':
        case 'PSC':
        case 'POC':
        case 'PPC':
          return text(`${ph}-${this.gender}`, '##');

        default:
          return ph;
      }
    },
  };
};

export const getPupilIdStr = (pupilObj: PupilType): string => {
  return 'pupil:' + pupilObj.firstname + '_' + pupilObj.lastname + '_' + pupilObj.description + '_' + pupilObj.gender;
};

export default pupilDefault;

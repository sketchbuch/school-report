// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_REPORTS } from '../constants/icons';
import {
  ROUTE_BUILDER,
  ROUTE_DEL_REPORT,
  ROUTE_EDIT_REPORT,
} from '../constants/routes';


/**
* Report type def.
*/

export type ReportType = {
  ...$Exact<DomainBaseType>,
  classes: Array<string>,
  label: string,
  maxChars: number,
};

const reportDefault: ReportType = {
  ...domainBaseDefault,
  classes: [],
  label: '',
  maxChars: 0,
};

export const reportSort = ['label', 'updated'];

/**
* Returns an object of ReportType based on reportObj but with additional props set.
*
* @param ReportType reportObj The initial report object.
* @param number ts A timestamp used for the id, created, and updated.
* @return ReportType The new report object.
*/
export function ReportFactory(reportObj: ReportType, ts: number): ReportType {
  return hydrateReport({
    ...reportObj,
    created: ts,
    updated: ts,
    id: generateId(getReportIdStr(reportObj), ts),
  });
}

/**
* Returns an updated reportObj with getters.
*
* @param ReportType reportObj The report object.
* @return ReportType The hydrated report object.
*/
export function hydrateReport(reportObj: ReportType): ReportType {
  return {
    ...reportDefault,
    ...reportObj,
    contains: function (term?: string) {
      if (term) {
        term = term.toLowerCase();
        const searchStr = this.label;
        if (term && searchStr.toLowerCase().indexOf(term) !== -1) return true;
      }

      return false;
    },
    getDescription: function () {
      return `(${this.classes.length})`;
    },
    getIcon: function () {
      return ICON_REPORTS;
    },
    getLabel: function () {
      return this.label;
    },
    getTooltip: function () {
      return`${this.getLabel()} - ${this.getDescription()}`;
    },
    getUrl: function (linkType: string) {
      let theUrl = ROUTE_BUILDER;
      
      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_REPORT;
      } else if (linkType === 'edit' || this.classes.length < 1) {
        theUrl = ROUTE_EDIT_REPORT;
      }

      return theUrl.replace(':reportId', this.id);
    },
  };
}

/**
* Returns a string to be used when creating an ID for reports.
*
* @param ReportType reportObj The report record.
* @return string The string to be used in creating the ID.
*/
export function getReportIdStr(reportObj: ReportType): string {
  return 'report:' + reportObj.label;
}


export default reportDefault;

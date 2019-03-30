// @flow

import type { DomainBaseType } from './domain';
import domainBaseDefault from './domain';
import { generateId } from '../utils/ids';
import { ICON_REPORTS } from '../constants/icons';
import { ROUTE_BUILDER, ROUTE_DEL_REPORT, ROUTE_EDIT_REPORT } from '../constants/routes';

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
  type: 'report',
};

export const reportSort = ['label', 'updated'];

export const ReportFactory = (reportObj: ReportType, ts: number): ReportType => {
  const newObj: ReportType = hydrateReport({ ...reportObj });

  if (reportObj.id !== '') {
    newObj.created = ts;
    newObj.updated = ts;
    newObj.id = generateId(getReportIdStr(reportObj), ts);
  }

  return newObj;
};

export const hydrateReport = (reportObj: ReportType): ReportType => {
  return {
    ...reportDefault,
    ...reportObj,
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
      return `(${this.classes.length})`;
    },
    getIcon: function() {
      return ICON_REPORTS;
    },
    getLabel: function() {
      return this.label;
    },
    getTooltip: function() {
      return `${this.getLabel()} - ${this.getDescription()}`;
    },
    getUrl: function(linkType: string) {
      let theUrl = ROUTE_BUILDER;

      if (linkType === 'delete') {
        theUrl = ROUTE_DEL_REPORT;
      } else if (linkType === 'edit' || this.classes.length < 1) {
        theUrl = ROUTE_EDIT_REPORT;
      }

      return theUrl.replace(':reportId', this.id);
    },
  };
};

export const getReportIdStr = (reportObj: ReportType): string => {
  return 'report:' + reportObj.label;
};

export default reportDefault;

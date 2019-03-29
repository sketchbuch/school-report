// @flow

import { text } from '../components/Translation/Translation';
import type { Breadcrumb, BreadcrumbMapObj, BreadcrumbProps } from '../types/breadcrumb';
import type { CategoryType } from '../types/category';
import type { ClassType } from '../types/class';
import type { DomainType } from '../types/domain';
import type { PupilType } from '../types/pupil';
import type { ReduxState } from '../types/reduxstate';
import type { ReportType } from '../types/report';
import type { TextType } from '../types/text';
import {
  ROUTE_BUILDER,
  ROUTE_CATEGORIES,
  ROUTE_CLASSES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_EDIT_REPORT,
  ROUTE_EDIT_TEXT,
  ROUTE_EXPORT_BUILDER,
  ROUTE_PUPILS,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TEXTS,
} from '../constants/routes';
import { getItemById } from './arrays';

const bcMap: { [key: string]: BreadcrumbMapObj } = {
  builder: { param: 'reportId', route: ROUTE_BUILDER, stateKey: 'reports' },
  export: {
    param: '',
    route: ROUTE_EXPORT_BUILDER,
    stateKey: '',
    trans: 'BreadcrumbExport:Reports',
  },
  classlist: { param: 'classId', route: ROUTE_PUPILS, stateKey: 'classes' },
  category: {
    param: 'categoryId',
    route: ROUTE_EDIT_CATEGORY,
    stateKey: 'categories',
  },
  class: { param: 'classId', route: ROUTE_CLASSES, stateKey: 'classes' },
  pupil: { param: 'pupilId', route: ROUTE_PUPILS, stateKey: 'pupils' },
  report: { param: 'reportId', route: ROUTE_EDIT_REPORT, stateKey: 'reports' },
  text: { param: 'textId', route: ROUTE_EDIT_TEXT, stateKey: 'texts' },
  categories: {
    param: '',
    route: ROUTE_CATEGORIES,
    stateKey: '',
    trans: 'Breadcrumb:Categories',
  },
  reports: {
    param: '',
    route: ROUTE_REPORTS,
    stateKey: '',
    trans: 'Breadcrumb:Reports',
  },
  settings: {
    param: '',
    route: ROUTE_SETTINGS,
    stateKey: '',
    trans: 'Breadcrumb:Settings',
  },
  classes: {
    param: '',
    route: ROUTE_CLASSES,
    stateKey: '',
    trans: 'Breadcrumb:Classes',
  },
  texts: {
    param: '',
    route: ROUTE_TEXTS,
    stateKey: '',
    trans: 'Breadcrumb:Texts',
  },
};

/**
 * Returns an array of objects with text and a link for use in a breadcrumb trail.
 */

// TODO - fix types
export function getBreadcrumbs(state: ReduxState, props: BreadcrumbProps): Breadcrumb[] {
  let activeElements: Breadcrumb[] = [];

  props.path.split('-').forEach(ele => {
    if (bcMap[ele] !== undefined) {
      const { param, route, stateKey, trans }: BreadcrumbMapObj = bcMap[ele];

      if (trans !== undefined) {
        const transParts = trans.split(':');

        activeElements.push({
          id: trans.replace(':', '-').toLowerCase(),
          link: getBreadcrumbLink(route, props.match.params),
          text: text(transParts[0], transParts[1]),
        });
      } else {
        const crumb = getBreadcrumb(state[stateKey], props.match.params[param]);

        if (crumb) {
          activeElements.push({
            id: `${ele}-${crumb.id}`,
            link: getBreadcrumbLink(route, props.match.params),
            text: crumb.getLabel(),
          });
        }
      }
    }
  });

  return activeElements;
}

/**
 * Returns the link for the breadcrumb element with path params replaced.
 */
function getBreadcrumbLink(path: string, matchParams: Object) {
  Object.keys(matchParams).forEach(param => {
    path = path.replace(`:${param}`, matchParams[param]);
  });

  return path;
}

function getBreadcrumb(stateSlice: DomainType[], objId: string): DomainType | null {
  if (objId) {
    const neededObj = stateSlice.find((obj: DomainType) => obj.id === objId);
    if (neededObj !== undefined) {
      return neededObj;
    }
  }

  return null;
}

// TODO - use one function
export function getActiveClass(classes: ClassType[], classId: string): ClassType | Object {
  return getItemById(classes, classId);
}

export function getActivePupil(pupils: PupilType[], pupilId: string): PupilType | Object {
  return getItemById(pupils, pupilId);
}

export function getActiveText(texts: TextType[], textId: string): TextType | Object {
  return getItemById(texts, textId);
}

export function getActiveReport(reports: ReportType[], reportId: string): ReportType | Object {
  return getItemById(reports, reportId);
}

export function getActiveCategory(categories: CategoryType[], categoryId: string): CategoryType | Object {
  return getItemById(categories, categoryId);
}

export function getClassPupils(pupils: PupilType[], classId: string): PupilType[] {
  if (classId !== '') {
    return pupils.filter((p: PupilType) => p.classId === classId);
  }
  return [];
}

/**
 * Returns an array of text IDs that have been selected by a pupil.
 */
// TODO - fix type
export const getSelectedTexts = (
  builderData: Object,
  activeReportId: string,
  activeClassId: string,
  activePupilId: string
): string[] => {
  let selected = [];
  // TODO - Rewrite
  if (builderData[activeReportId] !== undefined) {
    if (builderData[activeReportId][activeClassId] !== undefined) {
      if (builderData[activeReportId][activeClassId][activePupilId] !== undefined) {
        selected = builderData[activeReportId][activeClassId][activePupilId];
      }
    }
  }

  return selected;
};

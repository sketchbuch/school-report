// @flow

import { text }  from '../components/Translation/Translation';
import type { CategoryType } from '../types/category';
import type { ClassType } from '../types/class';
import type { PupilType } from '../types/pupil';
import type { ReportType } from '../types/report';
import type { TextType } from '../types/text';
import {
  ROUTE_BUILDER,
  ROUTE_CATEGORIES,
  ROUTE_CLASSES,
  ROUTE_EDIT_CATEGORY,
  ROUTE_EDIT_REPORT,
  ROUTE_EDIT_TEXT,
  ROUTE_PUPILS,
  ROUTE_REPORTS,
  ROUTE_SETTINGS,
  ROUTE_TEXTS,
} from '../constants/routes';

type BcStateType = CategoryType | ClassType | PupilType | ReportType | TextType;

const bcMap = {
  builder: { param: 'reportId', route: ROUTE_BUILDER, stateKey: 'reports' },
  classlist: { param: 'classId', route: ROUTE_PUPILS, stateKey: 'classes' },
  category: { param: 'categoryId', route: ROUTE_EDIT_CATEGORY, stateKey: 'categories' },
  class: { param: 'classId', route: ROUTE_CLASSES, stateKey: 'classes' },
  pupil: { param: 'pupilId', route: ROUTE_PUPILS, stateKey: 'pupils' },
  report: { param: 'reportId', route: ROUTE_EDIT_REPORT, stateKey: 'reports' },
  text: { param: 'textId', route: ROUTE_EDIT_TEXT, stateKey: 'texts' },
  categories: { param: '', route: ROUTE_CATEGORIES, stateKey: '', trans: "Breadcrumb:Categories" },
  reports: { param: '', route: ROUTE_REPORTS, stateKey: '', trans: "Breadcrumb:Reports" },
  settings: { param: '', route: ROUTE_SETTINGS, stateKey: '', trans: "Breadcrumb:Settings" },
  classes: { param: '', route: ROUTE_CLASSES, stateKey: '', trans: "Breadcrumb:Classes" },
  texts: { param: '', route: ROUTE_TEXTS, stateKey: '', trans: "Breadcrumb:Texts" },
}


/**
* Returns an array of objects with text and a link for use in a breadcrumb trail.
*
* @param object state The redux state.
* @param object props The props of the component calling this method.
* @return array an array of matching breadcrumb parts.
*/
export function getBreadcrumbs(state: Object, props: Object) {
  let activeElements = [];

  props.path.split('-').forEach((ele) => {
    if (bcMap[ele] !== undefined) {
      const { param, route, stateKey, trans } = bcMap[ele];

      if (trans !== undefined) {
        const transParts = trans.split(':');

        activeElements.push({
          id: text,
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
*
* @param string path The route that represents the link.
* @param array matchParams Any matching route params.
* @return string The link URL.
*/
function getBreadcrumbLink(path: string, matchParams: Object) {
  Object.keys(matchParams).forEach((param) => {
    path = path.replace(`:${param}`, matchParams[param]);
  });

  return path;
}

/**
* Returns the active class from state.classes that matches the classId or an empty object.
*
* @param object stateSlice The slice of the state that contains the object needed.
* @param string objId The id of the obect needed.
* @return object|null Either a copy of the object needed or null.
*/
function getBreadcrumb(stateSlice: Array<BcStateType>, objId: string): ClassType | null {
  if (objId) {
    const neededObj = stateSlice.find(obj => obj.id === objId);
    if (neededObj !== undefined) return {...neededObj};
  }

  return null;
}

/**
* Returns the active class from state.classes that matches the classId or an empty object.
*
* @param array classes The classes from redux state.
* @param string classId The id of the class looked for.
* @return object Either the class or an empty object.
*/
export function getActiveClass(classes: Array<ClassType>, classId: string): ClassType | Object {
  if (classId !== '') return classes.filter(c => c.id === classId).shift();
  return {};
}

/**
* Returns the active pupil from state.pupils that matches the pupilId or an empty object.
*
* @param array pupils The pupils from redux state.
* @param string pupilId The id of the pupil looked for.
* @return object Either the pupil or an empty object.
*/
export function getActivePupil(pupils: Array<PupilType>, pupilId: string): PupilType | Object {
  if (pupilId !== '') return pupils.filter(p => p.id === pupilId).shift();
  return {};
}

/**
* Returns the active text from state.texts that matches the textId or an empty object.
*
* @param array texts The texts from redux state.
* @param string textId The id of the text looked for.
* @return object Either the text or an empty object.
*/
export function getActiveText(texts: Array<TextType>, textId: string): TextType | Object {
  if (textId !== '') return texts.filter(t => t.id === textId).shift();
  return {};
}

/**
* Returns the active report from state.reports that matches the reportId or an empty object.
*
* @param array reports The reports from redux state.
* @param string reportId The id of the report looked for.
* @return object Either the text or an empty object.
*/
export function getActiveReport(reports: Array<ReportType>, reportId: string): ReportType | Object {
  if (reportId !== '') return reports.filter(r => r.id === reportId).shift();
  return {};
}

/**
* Returns the active category from state.categories that matches the categoryId or an empty object.
*
* @param array categories The categories from redux state.
* @param string categoryId The id of the category looked for.
* @return object Either the category or an empty object.
*/
export function getActiveCategory(categories: Array<CategoryType>, categoryId: string): CategoryType | Object {
  if (categoryId !== '') return categories.filter(r => r.id === categoryId).shift();
  return {};
}

/**
* Returns an array of pupils from state.pupils that matches the classId or an empty array.
*
* @param array pupils The pupils from redux state.
* @param string classId The id of the class looked for.
* @return array Either the matching pupils or an empty array.
*/
export function getClassPupils(pupils: Array<PupilType>, classId: string): Array<PupilType> {
  if (classId !== '') return pupils.filter(p => p.classId === classId);
  return [];
}

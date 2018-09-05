// @flow

import { generateId } from '../utils/ids';
import { ICON_CLASSES } from '../constants/icons';
import {
  ROUTE_DEL_CLASS,
  ROUTE_EDIT_CLASS,
  ROUTE_PUPILS,
} from '../constants/routes';

type PupilEle = {
  pupil_name: string,
  texts: Array<string>,
};

type ClassEle = {
  class_name: string,
  class_name_count: string,
  pupil_count: number,
  pupils: Array<PupilEle>,
};


/**
* Export type def.
*/

export type ExportType = {
  classCount: number,
  content: Array<ClassEle>,
  exported: string,
  name: string,
  pupilCount: number,
  reportName: string,
};

const exportDefault: ExportType = {
  classCount: -1,
  content: [],
  exported: '',
  name: '',
  pupilCount: -1,
  reportName: '',
};


export default exportDefault;

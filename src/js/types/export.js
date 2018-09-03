// @flow

import { generateId } from '../utils/ids';
import { ICON_CLASSES } from '../constants/icons';
import {
  ROUTE_DEL_CLASS,
  ROUTE_EDIT_CLASS,
  ROUTE_PUPILS,
} from '../constants/routes';


/**
* Export type def.
*/

export type ExportType = {
  name: string,
};

const exportDefault: ExportType = {
  name: '',
};


export default exportDefault;

// @flow

import {
  ADD_REPORT,
  DATA_LOADED,
  DELETE_ALL_REPORTS,
  DELETE_REPORT,
  REPLACE_DATA,
  REPLACE_REPORTS,
  UPDATE_REPORT,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import { hydrateReport } from '../types/report';


/**
* Reports Reducer.
*/

export default function reducer(state: Array<Object> = [], action: Object) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_REPORTS:
    case REPLACE_DATA:
      if (action.payload && action.payload.reports !== undefined) {
          if (Array.isArray(action.payload.reports)) {
            const newState = [];
            action.payload.reports.forEach(item => {
              newState.push(hydrateReport(item));
            });
            return newState;
          }
      }

      break;

    case UPDATE_REPORT:
      return reduce.arr.updateObj(state, action.payload);

    case ADD_REPORT:
      return reduce.arr.addObj(state, action.payload);

    case DELETE_REPORT:
      return reduce.arr.removeObj(state, action.payload);

    case DELETE_ALL_REPORTS:
      return [];

    default:
      return state;
  }

  return state;
}
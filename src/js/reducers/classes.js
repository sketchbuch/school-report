// @flow

import {
  ADD_CLASS,
  DATA_LOADED,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  REPLACE_CLASSES,
  REPLACE_DATA,
  UPDATE_CLASS,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import { hydrateClass } from '../types/class';
import type { ClassType } from '../types/class';
import type { ActionObj } from '../types/action';

/**
 * Classes Reducer.
 */

export default function reducer(state: Array<ClassType> = [], action: ActionObj) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_CLASSES:
    case REPLACE_DATA:
      if (action.payload && action.payload.classes !== undefined) {
        if (Array.isArray(action.payload.classes)) {
          const newState = [];
          action.payload.classes.forEach(item => {
            newState.push(hydrateClass(item));
          });
          return newState;
        }
      }

      break;

    case UPDATE_CLASS:
      return reduce.arr.updateObj(state, action.payload);

    case ADD_CLASS:
      return reduce.arr.addObj(state, action.payload);

    case DELETE_CLASS:
      return reduce.arr.removeObj(state, action.payload);

    case DELETE_ALL_CLASSES:
      return [];

    default:
      return state;
  }

  return state;
}

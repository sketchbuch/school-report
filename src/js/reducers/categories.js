// @flow

import {
  ADD_CATEGORY,
  DATA_LOADED,
  DELETE_ALL_CATEGORIES,
  DELETE_CATEGORY,
  REPLACE_CATEGORIES,
  REPLACE_DATA,
  UPDATE_CATEGORY,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import { hydrateCategory } from '../types/category';


/**
* Categories Reducer.
*/

export default function reducer(state: Array<Object> = [], action: Object) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_CATEGORIES:
    case REPLACE_DATA:
      if (action.payload && action.payload.categories !== undefined) {
          if (Array.isArray(action.payload.categories)) {
            const newState = [];
            action.payload.categories.forEach(item => {
              newState.push(hydrateCategory(item));
            });
            return newState;
          }
      }

      break;

    case UPDATE_CATEGORY:
      return reduce.arr.updateObj(state, action.payload);

    case ADD_CATEGORY:
      return reduce.arr.addObj(state, action.payload);

    case DELETE_CATEGORY:
      return reduce.arr.removeObj(state, action.payload);

    case DELETE_ALL_CATEGORIES:
      return [];

    default:
      return state;
  }

  return state;
}
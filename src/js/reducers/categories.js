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
import type { ActionObj } from '../types/action';
import type { CategoryType } from '../types/category';
import { hydrateCategory } from '../types/category';

export default function reducer(state: CategoryType[] = [], action: ActionObj) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_CATEGORIES:
    case REPLACE_DATA:
      if (action.payload && action.payload.categories !== undefined) {
        if (Array.isArray(action.payload.categories)) {
          const newState: CategoryType[] = [];
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

// @flow

import {
  SAVE_BUILDER,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import type { ActionObj } from '../types/action';


/**
* Reports Reducer.
*/

export default function reducer(state: {} = {}, action: ActionObj) {
  switch (action.type) {
    case SAVE_BUILDER:
      if (action.payload !== undefined) {
        console.log('action.payload', action.payload);
        return action.payload;
      }

      break;

    default:
      return state;
  }

  return state;
}

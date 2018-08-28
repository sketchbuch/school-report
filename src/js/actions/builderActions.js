// @flow

import {
  SAVE_BUILDER,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';


/**
* Builder Actions
*/

export function save(selected: Object): ActionCreator {
  console.log('saving..', selected);
  return {
    type: SAVE_BUILDER,
  };
/*   return (dispatch, getState) => {
    dispatch({
      type: SAVE_BUILDER,
    });
  }; */
}
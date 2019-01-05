// @flow

import {
  SAVE_BUILDER,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import { FILE_BUILDER } from '../constants/io';
import type { ActionCreator } from '../types/action';


/**
* Builder Actions
*/

export function save(
  reportId: string, 
  classId: string, 
  pupilId: string, 
  selected: Array<string>, 
  callback: Function,
  immediate: boolean,
): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_BUILDER,
      payload: { selected },
      meta: {
        reportId,
        classId,
        pupilId,
      },
    });
    persist(dispatch, getState, callback, [FILE_BUILDER], immediate);
  };
}
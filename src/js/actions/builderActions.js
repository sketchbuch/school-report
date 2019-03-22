// @flow

import { SAVE_BUILDER } from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import { FILE_BUILDER } from '../constants/io';

export const save = (
  reportId: string,
  classId: string,
  pupilId: string,
  selected: string[],
  callback: Function,
  immediate: boolean = false
): ActionCreator => {
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
};

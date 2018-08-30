// @flow

import {
  SAVE_BUILDER,
} from '../constants/actionTypes';
import { persistBuilder } from '../fs/persist';
import { createBuilderFolder } from '../fs/fs';
import type { ActionCreator } from '../types/action';


/**
* Builder Actions
*/

export function save(reportId: string, selected: Object, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: SAVE_BUILDER,
      payload: { [reportId]: selected },
      meta: { reportId }
    });
    //persistBuilder(dispatch, getState, callback, reportId);
  };
},
// @flow

import {
  ADD_REPORT,
  DELETE_ALL_REPORTS,
  DELETE_REPORT,
  REPLACE_REPORTS,
  UPDATE_REPORT,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import { FILE_REPORTS } from '../constants/io';
import type { ActionCreator } from '../types/action';
import type { ReportType } from '../types/report';

/**
 * Report Actions (the list items)
 */

export function replace(updatedData: Array<ReportType>, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_REPORTS,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_REPORTS]);
  };
}

export function update(reportToUpdate: ReportType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_REPORT,
      payload: reportToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_REPORTS]);
  };
}

export function add(reportToAdd: ReportType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_REPORT,
      payload: reportToAdd,
    });
    persist(dispatch, getState, callback, [FILE_REPORTS]);
  };
}

export function deleteOne(id: string, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_REPORT,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_REPORTS]);
  };
}

export function deleteAll(callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ALL_REPORTS });
    persist(dispatch, getState, callback, [FILE_REPORTS]);
  };
}

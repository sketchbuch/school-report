// @flow

import {
  ADD_CLASS,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  REPLACE_CLASSES,
  UPDATE_CLASS,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import { FILE_CLASSES, FILE_PUPILS } from '../constants/io';
import type { ActionCreator } from '../types/action';
import type { ClassType } from '../types/class';


/**
* Class Actions
*/

export function replace(updatedData: Array<ClassType>, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_CLASSES,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
}

export function update(classToUpdate: ClassType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CLASS,
      payload: classToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
}

export function add(classToAdd: ClassType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CLASS,
      payload: classToAdd,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
}

export function deleteOne(id: string, callback: Function = ()=>{}): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CLASS,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_CLASSES, FILE_PUPILS]);
  };
}

export function deleteAll(callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ALL_CLASSES });
    persist(dispatch, getState, callback, [FILE_CLASSES, FILE_PUPILS]);
  };
}

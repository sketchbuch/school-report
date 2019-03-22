// @flow

import { ADD_CLASS, DELETE_ALL_CLASSES, DELETE_CLASS, REPLACE_CLASSES, UPDATE_CLASS } from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import type { ClassType } from '../types/class';
import { FILE_CLASSES, FILE_PUPILS } from '../constants/io';

export const replace = (updatedData: ClassType[], callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_CLASSES,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
};

export const update = (classToUpdate: ClassType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CLASS,
      payload: classToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
};

export const add = (classToAdd: ClassType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CLASS,
      payload: classToAdd,
    });
    persist(dispatch, getState, callback, [FILE_CLASSES]);
  };
};

export const deleteOne = (id: string, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CLASS,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_CLASSES, FILE_PUPILS]);
  };
};

export const deleteAll = (callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ALL_CLASSES });
    persist(dispatch, getState, callback, [FILE_CLASSES, FILE_PUPILS]);
  };
};

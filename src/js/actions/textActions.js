// @flow

import { ADD_TEXT, DELETE_ALL_TEXTS, DELETE_TEXT, REPLACE_TEXTS, UPDATE_TEXT } from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import type { TextType } from '../types/text';
import { FILE_TEXTS } from '../constants/io';

export const replace = (updatedData?: TextType[], callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_TEXTS,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_TEXTS]);
  };
};

export const update = (textToUpdate: TextType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_TEXT,
      payload: textToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_TEXTS]);
  };
};

export const add = (newText: TextType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_TEXT,
      payload: newText,
    });
    persist(dispatch, getState, callback, [FILE_TEXTS]);
  };
};

export const deleteOne = (id: string, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_TEXT,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_TEXTS]);
  };
};

export const deleteAll = (callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ALL_TEXTS });
    persist(dispatch, getState, callback, [FILE_TEXTS]);
  };
};

// @flow

import {
  CREATE_DATA,
  DATA_CREATED,
  DATA_LOADED,
  LOAD_DATA,
  PERSISTING_ERROR,
  PERSISTING_SUCCESS,
  REPLACE_DATA,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import {
  FILE_BUILDER,
  FILE_CATEGORIES,
  FILE_CLASSES,
  FILE_PUPILS,
  FILE_REPORTS,
  FILE_SETTINGS,
  FILE_TEXTS,
} from '../constants/io';
import { readAppData, writeAppData } from '../fs/fs';

export const replace = (updatedData?: Object, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_DATA,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [
      FILE_BUILDER,
      FILE_CATEGORIES,
      FILE_CLASSES,
      FILE_PUPILS,
      FILE_TEXTS,
      FILE_REPORTS,
    ]);
  };
};

export const create = (callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    const content = {
      [FILE_BUILDER]: { builder: {} },
      [FILE_CATEGORIES]: { categories: [] },
      [FILE_CLASSES]: { classes: [] },
      [FILE_PUPILS]: { pupils: [] },
      [FILE_REPORTS]: { reports: [] },
      [FILE_SETTINGS]: { settings: {} },
      [FILE_TEXTS]: { texts: [] },
    };
    dispatch({ type: CREATE_DATA });
    writeAppData(content, callback);
  };
};

export const created = (): ActionCreator => {
  return { type: DATA_CREATED };
};

export const load = (callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_DATA });
    readAppData(
      [FILE_BUILDER, FILE_CATEGORIES, FILE_CLASSES, FILE_PUPILS, FILE_REPORTS, FILE_SETTINGS, FILE_TEXTS],
      callback
    );
  };
};

export const loaded = (loadedData?: Object): ActionCreator => {
  return {
    type: DATA_LOADED,
    payload: loadedData,
  };
};

export const persistenceSuccess = (dataType: string): ActionCreator => {
  return {
    type: PERSISTING_SUCCESS,
    payload: { dataType },
  };
};

export const persistenceError = (dataType: string): ActionCreator => {
  return {
    type: PERSISTING_ERROR,
    payload: { dataType },
  };
};

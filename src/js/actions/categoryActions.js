// @flow

import {
  ADD_CATEGORY,
  DELETE_ALL_CATEGORIES,
  DELETE_CATEGORY,
  REPLACE_CATEGORIES,
  UPDATE_CATEGORY,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import { FILE_CATEGORIES } from '../constants/io';
import type { ActionCreator } from '../types/action';
import type { CategoryType } from '../types/category';

/**
 * Category Actions
 */

export function replace(updatedData?: Array<CategoryType>, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_CATEGORIES,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_CATEGORIES]);
  };
}

export function update(categoryToUpdate: CategoryType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_CATEGORY,
      payload: categoryToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_CATEGORIES]);
  };
}

export function add(newText: CategoryType, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_CATEGORY,
      payload: newText,
    });
    persist(dispatch, getState, callback, [FILE_CATEGORIES]);
  };
}

export function deleteOne(id: string, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_CATEGORY,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_CATEGORIES]);
  };
}

export function deleteAll(callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: DELETE_ALL_CATEGORIES });
    persist(dispatch, getState, callback, [FILE_CATEGORIES]);
  };
}

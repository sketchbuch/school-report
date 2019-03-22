// @flow

import {
  ADD_PUPIL,
  DELETE_ALL_CLASS_PUPILS,
  DELETE_PUPIL,
  REPLACE_PUPILS,
  UPDATE_PUPIL,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import type { PupilType } from '../types/pupil';
import { FILE_PUPILS } from '../constants/io';

export const replace = (updatedData: PupilType[], callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: REPLACE_PUPILS,
      payload: updatedData,
    });
    persist(dispatch, getState, callback, [FILE_PUPILS]);
  };
};

export const update = (pupilToUpdate: PupilType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_PUPIL,
      payload: pupilToUpdate,
    });
    persist(dispatch, getState, callback, [FILE_PUPILS]);
  };
};

export const add = (newPupil: PupilType, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: ADD_PUPIL,
      payload: newPupil,
    });
    persist(dispatch, getState, callback, [FILE_PUPILS]);
  };
};

export const deleteOne = (id: string, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_PUPIL,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_PUPILS]);
  };
};

export const deletePupils = (id: string, callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({
      type: DELETE_ALL_CLASS_PUPILS,
      payload: { id },
    });
    persist(dispatch, getState, callback, [FILE_PUPILS]);
  };
};

// @flow

import {
  ADD_PUPIL,
  DATA_LOADED,
  DELETE_ALL_CLASS_PUPILS,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  DELETE_PUPIL,
  REPLACE_DATA,
  REPLACE_PUPILS,
  UPDATE_PUPIL,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import { hydratePupil } from '../types/pupil';
import type { PupilType } from '../types/pupil';
import type { ActionObj } from '../types/action';

export default function reducer(state: PupilType[] = [], action: ActionObj) {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_DATA:
    case REPLACE_PUPILS:
      if (action.payload && action.payload.pupils !== undefined) {
        if (Array.isArray(action.payload.pupils)) {
          const newState: PupilType[] = [];
          action.payload.pupils.forEach(item => {
            newState.push(hydratePupil(item));
          });
          return newState;
        }
      }

      break;

    case UPDATE_PUPIL:
      return reduce.arr.updateObj(state, action.payload);

    case ADD_PUPIL:
      return reduce.arr.addObj(state, action.payload);

    case DELETE_PUPIL:
      return reduce.arr.removeObj(state, action.payload);

    case DELETE_ALL_CLASSES: // Can remove all pupils
      return [];

    case DELETE_ALL_CLASS_PUPILS:
    case DELETE_CLASS: // Must delete all pupils for this class (action.payload.id === the class ID).
      return state.filter((item: PupilType) => {
        const { payload }: Object = action;
        if (payload.id !== undefined) {
          return item.classId !== payload.id;
        }
        return true;
      });

    default:
      return state;
  }

  return state;
}

// @flow

import {
  ADD_TEXT,
  DATA_LOADED,
  DELETE_ALL_TEXTS,
  DELETE_TEXT,
  REPLACE_DATA,
  REPLACE_TEXTS,
  UPDATE_TEXT,
} from '../constants/actionTypes';
import reduce from '../utils/reducers';
import { hydrateText } from '../types/text';
import type { TextType } from '../types/text';
import type { ActionObj } from '../types/action';

const reducer = (state: TextType[] = [], action: ActionObj): TextType[] => {
  switch (action.type) {
    case DATA_LOADED:
    case REPLACE_DATA:
    case REPLACE_TEXTS:
      if (action.payload && action.payload.texts !== undefined) {
        if (Array.isArray(action.payload.texts)) {
          const newState: TextType[] = [];
          action.payload.texts.forEach(item => {
            newState.push(hydrateText(item));
          });
          return newState;
        }
      }

      break;

    case UPDATE_TEXT:
      return reduce.arr.updateObj(state, action.payload);

    case ADD_TEXT:
      return reduce.arr.addObj(state, action.payload);

    case DELETE_TEXT:
      return reduce.arr.removeObj(state, action.payload);

    case DELETE_ALL_TEXTS:
      return [];

    default:
      return state;
  }

  return state;
};

export default reducer;

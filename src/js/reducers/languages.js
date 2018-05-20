// @flow

import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../constants/actionTypes';
import type { LangType } from '../types/lang';


type initialState = {
  available: Array<LangType>,
  current: string,
  default: string
};

const defaultState = {
  available: [{
    key: "EN",
    label: "English",
  }],
  current: 'EN',
  default: 'EN'
};


/**
* Languages Reducer.
*/
export default function reducer(state: initialState = defaultState, action: Object) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
      if (action.payload.lang) {
        const langFound = state.available.find((lang) => lang.key === action.payload.lang);
        if (langFound !== undefined) return {...state, available: [...state.available], current: action.payload.lang};
      }
    break;

    case SETTINGS_LOADED:
      const { settings } = action.payload;
      if (settings && settings.language) {
        const langFound = state.available.find((lang) => lang.key === settings.language);
        if (langFound !== undefined) return {...state, available: [...state.available], current: settings.language};
      }
    break;

    default:
      return state;
  }

  return state;
}

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
    case SETTINGS_LOADED:
      let reqLang = '';

      if (action.payload.settings && action.payload.settings.language) {
        reqLang = action.payload.settings.language.current;
      } else if (action.payload.lang) {
        reqLang = action.payload.lang;
      }

      const langFound = state.available.find((lang) => lang.key === reqLang);
      if (langFound !== undefined) return {...state, available: [...state.available], current: langFound.key };
    break;

    default:
      return state;
  }

  return state;
}
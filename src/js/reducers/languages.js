// @flow

import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../constants/actionTypes';
import type { LangType } from '../types/lang';
import type { ActionObj } from '../types/action';


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
export default function reducer(state: initialState = defaultState, action: ActionObj) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
    case SETTINGS_LOADED:
      let reqLang = '';
      const { payload }: Object = action;

      if (payload.settings !== undefined && payload.settings.language) {
        reqLang = payload.settings.language.current;
      } else if (payload.lang !== undefined ) {
        reqLang = payload.lang;
      }

      const langFound = state.available.find((lang) => lang.key === reqLang);
      if (langFound !== undefined) return {...state, available: [...state.available], current: langFound.key };
    break;

    default:
      return state;
  }

  return state;
}
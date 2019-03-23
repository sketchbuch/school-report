// @flow

import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../constants/actionTypes';
import type { LangType } from '../types/lang';
import type { ActionObj } from '../types/action';

type initialState = {
  available: LangType[],
  current: string,
  default: string,
};

const defaultState = {
  available: [
    {
      key: 'EN',
      label: 'English',
    },
  ],
  current: 'EN',
  default: 'EN',
};

export default function reducer(state: initialState = defaultState, action: ActionObj) {
  switch (action.type) {
    case CHANGE_LANGUAGE:
    case SETTINGS_LOADED:
      let reqLang: string = '';
      const { payload }: Object = action;

      if (payload.settings !== undefined && payload.settings.language) {
        reqLang = payload.settings.language;
      } else if (payload.lang !== undefined) {
        reqLang = payload.lang;
      }

      if (reqLang) {
        const langFound: ?LangType = state.available.find(lang => lang.key === reqLang);
        if (langFound != null) {
          return {
            ...state,
            available: [...state.available],
            current: langFound.key,
          };
        }
      }
      break;

    default:
      return state;
  }

  return state;
}

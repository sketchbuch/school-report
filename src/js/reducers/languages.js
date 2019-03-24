// @flow

import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../constants/actionTypes';
import type { LangType } from '../types/lang';
import type { ActionObj } from '../types/action';

type LanguageState = {
  available: LangType[],
  current: string,
  default: string,
};

const defaultLanguageState = {
  available: [
    {
      key: 'EN',
      label: 'English',
    },
  ],
  current: 'EN',
  default: 'EN',
};

export default function reducer(state: LanguageState = defaultLanguageState, action: ActionObj): LanguageState {
  switch (action.type) {
    case CHANGE_LANGUAGE:
    case SETTINGS_LOADED:
      let reqLang: string = '';
      const { payload }: Object = action;

      if (payload.settings !== undefined && payload.settings.language) {
        reqLang = payload.settings.language.current;
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

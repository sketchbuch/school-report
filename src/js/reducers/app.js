// @flow

import {
  DATA_CREATED,
  DATA_LOADED,
  APP_ERRORED,
  LANGUAGE_LOADED,
  APP_LOADED,
  SETTINGS_LOADED,
} from '../constants/actionTypes';
import type { AppType } from '../types/app';
import appDefault from '../types/app';

const reducer = (state: AppType = appDefault, action: Object): AppType => {
  switch (action.type) {
    case APP_ERRORED:
      return { ...state, error: true };

    case APP_LOADED:
      return { ...state, loaded: true };

    case LANGUAGE_LOADED:
      return { ...state, languageLoaded: true };

    case SETTINGS_LOADED:
      return { ...state, settingsLoaded: true };

    case DATA_LOADED:
      return { ...state, dataLoaded: true };

    case DATA_CREATED:
      return { ...state, dataCreated: true };

    default:
      return state;
  }
};

export default reducer;

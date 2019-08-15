// @flow

import settingsDefault from '../types/settings';
import type { SettingsType } from '../types/settings';
import { REPLACE_DATA, SETTINGS_LOADED, UPDATE_SETTINGS } from '../constants/actionTypes';

const reducer = (state: SettingsType = settingsDefault, action: Object): SettingsType => {
  switch (action.type) {
    case REPLACE_DATA:
    case UPDATE_SETTINGS:
    case SETTINGS_LOADED:
      if (action.payload && action.payload.settings !== undefined) {
        return { ...state, ...action.payload.settings };
      }
      break;

    default:
      return state;
  }

  return state;
};

export default reducer;

// @flow

import settingsDefault from '../types/settings';
import { REPLACE_DATA, SETTINGS_LOADED, UPDATE_SETTINGS } from '../constants/actionTypes';

/**
 * Settings Reducer.
 */

export default function reducer(state: Object = settingsDefault, action: Object) {
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
}

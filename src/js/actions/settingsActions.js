// @flow

import {
  LOAD_SETTINGS,
  UPDATE_SETTINGS,
  SETTINGS_LOADED,
} from '../constants/actionTypes';
import persist from '../fs/persist';
import { createDataFolder, readDataFile } from '../fs/fs';
import * as languageActions from './languageActions';
import { FILE_SETTINGS } from '../constants/io';
import type { ActionCreator } from '../types/action';
import type { SettingsType } from '../types/settings';

/**
 * Class Actions
 */

export function update(
  settings: SettingsType,
  loadLang: boolean,
  callback: Function
): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: UPDATE_SETTINGS,
      payload: { settings },
    });

    if (loadLang) {
      dispatch(languageActions.change(settings.language));
    }

    persist(dispatch, getState, callback, [FILE_SETTINGS]);
  };
}

export function load(callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_SETTINGS });
    createDataFolder(FILE_SETTINGS);
    readDataFile(FILE_SETTINGS, callback);
  };
}

export function loaded(settings: Object): ActionCreator {
  if (
    settings.settings !== undefined &&
    settings.settings.language !== undefined
  ) {
    window.reportr.curLang = settings.settings.language;
  }

  return {
    type: SETTINGS_LOADED,
    payload: settings,
  };
}

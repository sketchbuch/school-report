// @flow

import { LOAD_SETTINGS, UPDATE_SETTINGS, SETTINGS_LOADED } from '../constants/actionTypes';
import * as languageActions from './languageActions';
import persist from '../fs/persist';
import type { ActionCreator } from '../types/action';
import type { SettingsType } from '../types/settings';
import { FILE_SETTINGS } from '../constants/io';
import { createDataFolder, readDataFile, dataFolderExists } from '../fs/fs';

export const update = (settings: SettingsType, loadLang: boolean, callback: Function): ActionCreator => {
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
};

export const load = (callback: Function): ActionCreator => {
  return (dispatch, getState) => {
    dispatch({ type: LOAD_SETTINGS });

    if (!dataFolderExists()) {
      createDataFolder();
    }

    readDataFile(FILE_SETTINGS, callback);
  };
};

export const loaded = (settings: Object): ActionCreator => {
  if (settings.settings !== undefined && settings.settings.language !== undefined) {
    window.reportr.curLang = settings.settings.language;
  }

  return {
    type: SETTINGS_LOADED,
    payload: settings,
  };
};

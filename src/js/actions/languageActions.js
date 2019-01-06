// @flow

import {
  LANGUAGE_LOADED,
  LOAD_LANGUAGE,
  CHANGE_LANGUAGE,
} from '../constants/actionTypes';
import { readLangFile } from '../fs/fs';
import type { ActionCreator } from '../types/action';

/**
 * Language Actions
 */

export function change(langKey: string, callback?: Function): ActionCreator {
  return (dispatch, getState) => {
    function langReady() {
      window.reportr.curLang = langKey;

      dispatch({
        type: CHANGE_LANGUAGE,
        payload: { lang: langKey },
      });

      if (callback) callback();
    }

    if (window.reportr.translations[langKey] === undefined) {
      dispatch(
        load(langKey, function(ioResult: Object) {
          Object.assign(window.reportr.translations, ioResult.data);
          langReady();
        })
      );
    } else {
      langReady();
    }
  };
}

export function load(lang: string, callback: Function): ActionCreator {
  return (dispatch, getState) => {
    dispatch({
      type: LOAD_LANGUAGE,
      meta: { lang: lang },
    });
    readLangFile(lang, callback);
  };
}

export function loaded(): ActionCreator {
  return { type: LANGUAGE_LOADED };
}

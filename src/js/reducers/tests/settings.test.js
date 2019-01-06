// @flow

import reducer from '../settings';
import {
  REPLACE_DATA,
  SETTINGS_LOADED,
  UPDATE_SETTINGS,
} from '../../constants/actionTypes';
import settingsDefault from '../../types/settings';

/**
 * Settings Reducer Tests
 */

describe('Reducer: Settings', () => {
  const INITIAL_STATE = { ...settingsDefault };
  const NEW_LANG = 'DE';
  const TEST_STATE = {
    ...INITIAL_STATE,
    language: NEW_LANG,
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no settings object', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_DATA,
        payload: { settingswrong: '' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA return the new settings', () => {
    const ACTION = {
      type: REPLACE_DATA,
      payload: {
        settings: {
          language: NEW_LANG,
        },
      },
    };
    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });

  test('SETTINGS_LOADED return the new settings', () => {
    const ACTION = {
      type: SETTINGS_LOADED,
      payload: {
        settings: {
          language: NEW_LANG,
        },
      },
    };
    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });

  test('UPDATE_SETTINGS return the new settings', () => {
    const ACTION = {
      type: UPDATE_SETTINGS,
      payload: {
        settings: {
          language: NEW_LANG,
        },
      },
    };
    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });
});

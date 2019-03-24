// @flow

import reducer from '../settings';
import { REPLACE_DATA, SETTINGS_LOADED, UPDATE_SETTINGS } from '../../constants/actionTypes';
import settingsDefault from '../../types/settings';

describe('Reducer: Settings', () => {
  const inititialState = { ...settingsDefault };
  const NEW_LANG = 'DE';
  const TEST_STATE = {
    ...inititialState,
    language: NEW_LANG,
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(inititialState, { type: 'IGNORE' })).toEqual(inititialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no settings object', () => {
    expect(reducer(inititialState, { type: REPLACE_DATA, payload: {} })).toEqual(inititialState);
    expect(
      reducer(inititialState, {
        type: REPLACE_DATA,
        payload: { settingswrong: '' },
      })
    ).toEqual(inititialState);
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
    expect(reducer(inititialState, ACTION)).toEqual(TEST_STATE);
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
    expect(reducer(inititialState, ACTION)).toEqual(TEST_STATE);
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
    expect(reducer(inititialState, ACTION)).toEqual(TEST_STATE);
  });
});

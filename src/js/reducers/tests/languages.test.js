// @flow

import reducer from '../languages';
import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../../constants/actionTypes';


/**
* Languages Reducer Tests
*/

describe('Reducer: Languages', () => {
  const INITIAL_STATE = {
    available: [
      {
        key: "EN",
        label: "English",
      },
      {
        key: "DE",
        label: "Deutsch",
      },
    ],
    current: 'EN',
    default: 'EN'
  };
  const NEW_LANG = 'DE';
  const TEST_STATE = {
    ...INITIAL_STATE,
    available: [...INITIAL_STATE.available],
    current: NEW_LANG,
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('CHANGE_LANGUAGE should update the current language.', () => {
    const ACTION = {
      type: CHANGE_LANGUAGE,
      payload: {
        lang: NEW_LANG,
      },
    };

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });

  test('CHANGE_LANGUAGE should return the current state if there requested language does not exist', () => {
    const ACTION = {
      type: CHANGE_LANGUAGE,
      payload: {
        lang: 'FR',
      },
    };

    const ACTION2 = {
      type: CHANGE_LANGUAGE,
      payload: {},
    };

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, ACTION2)).toEqual(INITIAL_STATE);
  });

  test('SETTINGS_LOADED should update the current language based on the saved settings', () => {
    const ACTION = {
      type: SETTINGS_LOADED,
      payload: {
        settings: {
          language: {
            available: [...INITIAL_STATE.available],
            default: INITIAL_STATE.default,
            current: NEW_LANG,
          },
        },
      },
    };

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });
});

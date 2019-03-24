// @flow

import reducer from '../languages';
import { CHANGE_LANGUAGE, SETTINGS_LOADED } from '../../constants/actionTypes';

describe('Reducer: Languages', () => {
  const initialState = {
    available: [
      {
        key: 'EN',
        label: 'English',
      },
      {
        key: 'DE',
        label: 'Deutsch',
      },
    ],
    current: 'EN',
    default: 'EN',
  };
  const NEW_LANG = 'DE';
  const testState = {
    ...initialState,
    available: [...initialState.available],
    current: NEW_LANG,
  };

  test.skip('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'IGNORE' })).toEqual(initialState);
  });

  test.skip('CHANGE_LANGUAGE should update the current language.', () => {
    const action = {
      type: CHANGE_LANGUAGE,
      payload: {
        lang: NEW_LANG,
      },
    };

    expect(reducer(initialState, action)).toEqual(testState);
  });

  test.skip('CHANGE_LANGUAGE should return the current state if there requested language does not exist', () => {
    const action = {
      type: CHANGE_LANGUAGE,
      payload: {
        lang: 'FR',
      },
    };

    const action2 = {
      type: CHANGE_LANGUAGE,
      payload: {},
    };

    expect(reducer(initialState, action)).toEqual(initialState);
    expect(reducer(initialState, action2)).toEqual(initialState);
  });

  test('SETTINGS_LOADED should update the current language based on the saved settings', () => {
    const action = {
      type: SETTINGS_LOADED,
      payload: {
        settings: {
          language: {
            available: [...initialState.available],
            default: initialState.default,
            current: NEW_LANG,
          },
        },
      },
    };

    expect(reducer(initialState, action)).toEqual(testState);
  });
});

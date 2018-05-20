// @flow

import reducer from '../languages';
import { CHANGE_LANGUAGE } from '../../constants/actionTypes';


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

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('CHANGE_LANGUAGE should update the current language.', () => {
    const NEW_LANG = 'DE';
    const ACTION = {
      type: CHANGE_LANGUAGE,
      payload: {
        lang: NEW_LANG,
      },
    };
    const TEST_STATE = {
      ...INITIAL_STATE,
      available: [...INITIAL_STATE.available],
      current: NEW_LANG,
    };

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });
});

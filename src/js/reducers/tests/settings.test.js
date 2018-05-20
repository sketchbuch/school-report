// @flow

import reducer from '../settings';
import { UPDATE_SETTINGS } from '../../constants/actionTypes';
import settingsDefault from '../../types/settings';


/**
* Settings Reducer Tests
*/

describe('Reducer: Settings', () => {
  const INITIAL_STATE = {...settingsDefault};

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('UPDATE_SETTINGS return the new settings', () => {
    const NEW_LANG = 'DE';
    const ACTION = {
      type: UPDATE_SETTINGS,
      payload: {
        settings: {
          language: NEW_LANG,
        }
      },
    };
    const TEST_STATE = {
      ...INITIAL_STATE,
      language: NEW_LANG,
    }

    expect(reducer(INITIAL_STATE, ACTION)).toEqual(TEST_STATE);
  });
});

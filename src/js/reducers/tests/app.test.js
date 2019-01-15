// @flow

import reducer from '../app';
import appDefault from '../../types/app';
import {
  DATA_CREATED,
  DATA_LOADED,
  APP_ERRORED,
  LANGUAGE_LOADED,
  APP_LOADED,
  SETTINGS_LOADED,
} from '../../constants/actionTypes';

/**
 * Classes Reducer Tests
 */

describe('Reducer: App', () => {
  const INITIAL_STATE = { ...appDefault };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('APP_ERRORED should return with error = true', () => {
    const testState = { ...appDefault, error: true };
    expect(reducer(INITIAL_STATE, { type: APP_ERRORED })).toEqual(testState);
  });

  test('APP_LOADED should return with loaded = true', () => {
    const testState = { ...appDefault, loaded: true };
    expect(reducer(INITIAL_STATE, { type: APP_LOADED })).toEqual(testState);
  });

  test('LANGUAGE_LOADED should return with loaded = true', () => {
    const testState = { ...appDefault, languageLoaded: true };
    expect(reducer(INITIAL_STATE, { type: LANGUAGE_LOADED })).toEqual(testState);
  });

  test('SETTINGS_LOADED should return with error = true', () => {
    const testState = { ...appDefault, settingsLoaded: true };
    expect(reducer(INITIAL_STATE, { type: SETTINGS_LOADED })).toEqual(testState);
  });

  test('DATA_LOADED should return with dataLoaded = true', () => {
    const testState = { ...appDefault, dataLoaded: true };
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED })).toEqual(testState);
  });

  test('DATA_CREATED should return with dataCreated = true', () => {
    const testState = { ...appDefault, dataCreated: true };
    expect(reducer(INITIAL_STATE, { type: DATA_CREATED })).toEqual(testState);
  });
});

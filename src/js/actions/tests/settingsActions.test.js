// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LOAD_SETTINGS, UPDATE_SETTINGS, SETTINGS_LOADED } from '../../constants/actionTypes';
import * as settingsActions from '../settingsActions';
import settingsDefault from '../../types/settings';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Settings Actions Tests
 */

describe('Actions: settingsActions:', () => {
  const testSettings = { ...settingsDefault, language: 'DE' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ settings: { ...settingsDefault } });
    window.reportr.curLang = 'EN';
  });

  test('update() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: UPDATE_SETTINGS, payload: { settings: testSettings } }];

    expect.assertions(1);
    store.dispatch(settingsActions.update(testSettings, false, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('load() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: LOAD_SETTINGS }];

    expect.assertions(1);
    store.dispatch(settingsActions.load(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('loaded() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: SETTINGS_LOADED, payload: { settings: testSettings } }];

    expect.assertions(3);
    expect(window.reportr.curLang).toBe('EN');
    store.dispatch(settingsActions.loaded({ settings: testSettings }));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    expect(window.reportr.curLang).toBe(testSettings.language);
    store.clearActions();
  });

  test('loaded() only sets the current language if it is in the settings loaded', () => {
    const EXPECTED_ACTIONS = [{ type: SETTINGS_LOADED, payload: { settings: {} } }];

    expect.assertions(3);
    expect(window.reportr.curLang).toBe('EN');
    store.dispatch(settingsActions.loaded({ settings: {} }));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    expect(window.reportr.curLang).toBe('EN');
    store.clearActions();
  });
});

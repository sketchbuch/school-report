// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as settingsActions from '../settingsActions';
import settingsDefault from '../../types/settings';
import type { ActionObj } from '../../types/action';
import type { SettingsType } from '../../types/settings';
import { CHANGE_LANGUAGE, LOAD_SETTINGS, UPDATE_SETTINGS, SETTINGS_LOADED } from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Settings Actions Tests
 */

describe('Actions: settingsActions:', () => {
  const testSettings: SettingsType = { ...settingsDefault, language: 'DE' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ settings: { ...settingsDefault } });
    window.reportr.curLang = 'EN';
  });

  test('update() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: UPDATE_SETTINGS, payload: { settings: testSettings } }];

    expect.assertions(1);
    store.dispatch(settingsActions.update(testSettings, false, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('update() dispatches the correct actions if loadLang', () => {
    const expectedActions: ActionObj[] = [
      { type: UPDATE_SETTINGS, payload: { settings: testSettings } },
      { type: CHANGE_LANGUAGE, payload: { lang: 'DE' } },
    ];

    expect.assertions(1);
    store.dispatch(settingsActions.update(testSettings, true, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('load() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: LOAD_SETTINGS }];

    expect.assertions(1);
    store.dispatch(settingsActions.load(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('loaded() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: SETTINGS_LOADED, payload: { settings: testSettings } }];

    expect.assertions(3);
    expect(window.reportr.curLang).toBe('EN');
    store.dispatch(settingsActions.loaded({ settings: testSettings }));
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.reportr.curLang).toBe(testSettings.language);
    store.clearActions();
  });

  test('loaded() only sets the current language if it is in the settings loaded', () => {
    const expectedActions: ActionObj[] = [{ type: SETTINGS_LOADED, payload: { settings: {} } }];

    expect.assertions(3);
    expect(window.reportr.curLang).toBe('EN');
    store.dispatch(settingsActions.loaded({ settings: {} }));
    expect(store.getActions()).toEqual(expectedActions);
    expect(window.reportr.curLang).toBe('EN');
    store.clearActions();
  });
});

// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LANGUAGE_LOADED, LOAD_LANGUAGE, CHANGE_LANGUAGE } from '../../constants/actionTypes';
import * as languageActions from '../languageActions';
import type { ActionObj } from '../../types/action';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: languageActions:', () => {
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ settings: {} });
    window.reportr.curLang = 'EN';
  });

  describe('change():', () => {
    test('Dispatches the correct action', () => {
      const LANG_KEY: string = 'EN';
      const expectedActions: ActionObj[] = [{ type: CHANGE_LANGUAGE, payload: { lang: LANG_KEY } }];

      expect.assertions(1);
      store.dispatch(languageActions.change(LANG_KEY, callback));
      expect(store.getActions()).toEqual(expectedActions);
      store.clearActions();
    });

    test('Dispatches the correct actions if the language is not loaded', () => {
      const LANG_KEY: string = 'FR';
      const expectedActions: ActionObj[] = [{ type: LOAD_LANGUAGE, meta: { lang: LANG_KEY } }];

      expect.assertions(1);
      store.dispatch(languageActions.change(LANG_KEY, callback));
      expect(store.getActions()).toEqual(expectedActions);
      store.clearActions();
    });
  });

  test('load() dispatches the correct action', () => {
    const LANG_KEY: string = 'FR';
    const expectedActions: ActionObj[] = [{ type: LOAD_LANGUAGE, meta: { lang: LANG_KEY } }];

    expect.assertions(1);
    store.dispatch(languageActions.load(LANG_KEY, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('loaded() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: LANGUAGE_LOADED }];

    expect.assertions(1);
    store.dispatch(languageActions.loaded());
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });
});

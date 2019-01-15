// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as textActions from '../textActions';
import { ADD_TEXT, DELETE_ALL_TEXTS, DELETE_TEXT, REPLACE_TEXTS, UPDATE_TEXT } from '../../constants/actionTypes';
import textDefault from '../../types/text';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Report Text Actions Tests
 */

describe('Actions: textActions:', () => {
  let testClass = { ...textDefault, id: 't1', bodytext: 'A test text' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ texts: [] });
  });

  test('replace() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: REPLACE_TEXTS, payload: [testClass] }];

    expect.assertions(1);
    store.dispatch(textActions.replace([testClass], callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: UPDATE_TEXT, payload: testClass }];

    expect.assertions(1);
    store.dispatch(textActions.update(testClass, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: ADD_TEXT, payload: testClass }];

    expect.assertions(1);
    store.dispatch(textActions.add(testClass, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: DELETE_TEXT, payload: { id: 'c1' } }];

    expect.assertions(1);
    store.dispatch(textActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: DELETE_ALL_TEXTS }];

    expect.assertions(1);
    store.dispatch(textActions.deleteAll(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });
});

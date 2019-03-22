// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as textActions from '../textActions';
import textDefault from '../../types/text';
import type { ActionObj } from '../../types/action';
import type { TextType } from '../../types/text';
import { ADD_TEXT, DELETE_ALL_TEXTS, DELETE_TEXT, REPLACE_TEXTS, UPDATE_TEXT } from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: textActions:', () => {
  let testText: TextType = { ...textDefault, id: 't1', bodytext: 'A test text' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ texts: [] });
  });

  test('replace() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: REPLACE_TEXTS, payload: [testText] }];

    expect.assertions(1);
    store.dispatch(textActions.replace([testText], callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: UPDATE_TEXT, payload: testText }];

    expect.assertions(1);
    store.dispatch(textActions.update(testText, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: ADD_TEXT, payload: testText }];

    expect.assertions(1);
    store.dispatch(textActions.add(testText, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_TEXT, payload: { id: 'c1' } }];

    expect.assertions(1);
    store.dispatch(textActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_ALL_TEXTS }];

    expect.assertions(1);
    store.dispatch(textActions.deleteAll(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });
});

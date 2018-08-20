// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as classActions from '../classActions';
import {
  ADD_CLASS,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  REPLACE_CLASSES,
  UPDATE_CLASS,
} from '../../constants/actionTypes';
import classDefault from '../../types/class';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


/**
* Class Actions Tests
*/

describe('Actions: classActions:', () => {
  let testClass = {...classDefault, id: 'c1', label: 'Class'};
  let callback = ()=>{};
  let store = ()=>{};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ classes: [] });
  });

  test('replace() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: REPLACE_CLASSES, payload: [testClass] },
    ];

    expect.assertions(1);
    store.dispatch(classActions.replace([testClass], callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: UPDATE_CLASS, payload: testClass },
    ];

    expect.assertions(1);
    store.dispatch(classActions.update(testClass, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: ADD_CLASS, payload: testClass },
    ];

    expect.assertions(1);
    store.dispatch(classActions.add(testClass, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: DELETE_CLASS, payload: { id: 'c1' } },
    ];

    expect.assertions(1);
    store.dispatch(classActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: DELETE_ALL_CLASSES },
    ];

    expect.assertions(1);
    store.dispatch(classActions.deleteAll(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });
});

// @flow

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import {
  ADD_CATEGORY,
  DELETE_ALL_CATEGORIES,
  DELETE_CATEGORY,
  REPLACE_CATEGORIES,
  UPDATE_CATEGORY,
} from '../../constants/actionTypes';
import * as categoryActions from '../categoryActions';
import catgeoryDefault from '../../types/category';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Category Actions Tests
 */

describe('Actions: categoryActions:', () => {
  let testCategory = { ...catgeoryDefault, id: 'c1', label: 'Category' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ categories: [] });
  });

  test('replace() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: REPLACE_CATEGORIES, payload: [testCategory] }];

    expect.assertions(1);
    store.dispatch(categoryActions.replace([testCategory], callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: UPDATE_CATEGORY, payload: testCategory }];

    expect.assertions(1);
    store.dispatch(categoryActions.update(testCategory, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: ADD_CATEGORY, payload: testCategory }];

    expect.assertions(1);
    store.dispatch(categoryActions.add(testCategory, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: DELETE_CATEGORY, payload: { id: 'c1' } }];

    expect.assertions(1);
    store.dispatch(categoryActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: DELETE_ALL_CATEGORIES }];

    expect.assertions(1);
    store.dispatch(categoryActions.deleteAll(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });
});

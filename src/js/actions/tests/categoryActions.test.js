// @flow

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as categoryActions from '../categoryActions';
import catgeoryDefault from '../../types/category';
import type { ActionObj } from '../../types/action';
import type { CategoryType } from '../../types/category';
import {
  ADD_CATEGORY,
  DELETE_ALL_CATEGORIES,
  DELETE_CATEGORY,
  REPLACE_CATEGORIES,
  UPDATE_CATEGORY,
} from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: categoryActions:', () => {
  let testCategory: CategoryType = { ...catgeoryDefault, id: 'c1', label: 'Category' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ categories: [] });
  });

  test('replace() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: REPLACE_CATEGORIES, payload: [testCategory] }];

    expect.assertions(1);
    store.dispatch(categoryActions.replace([testCategory], callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: UPDATE_CATEGORY, payload: testCategory }];

    expect.assertions(1);
    store.dispatch(categoryActions.update(testCategory, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: ADD_CATEGORY, payload: testCategory }];

    expect.assertions(1);
    store.dispatch(categoryActions.add(testCategory, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_CATEGORY, payload: { id: 'c1' } }];

    expect.assertions(1);
    store.dispatch(categoryActions.deleteOne('c1', callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('deleteAll dispatches the correct action', () => {
    const expectedActions: ActionObj[] = [{ type: DELETE_ALL_CATEGORIES }];

    expect.assertions(1);
    store.dispatch(categoryActions.deleteAll(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });
});

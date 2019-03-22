// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as dataActions from '../dataActions';
import classDefault from '../../types/class';
import type { ActionObj } from '../../types/action';
import type { ClassType } from '../../types/class';
import {
  CREATE_DATA,
  DATA_CREATED,
  DATA_LOADED,
  LOAD_DATA,
  PERSISTING_ERROR,
  PERSISTING_SUCCESS,
  REPLACE_DATA,
} from '../../constants/actionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

describe('Actions: dataActions:', () => {
  let testDataType: string = 'class';
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({});
  });

  test('replace() should return expected action', () => {
    const testData: { classes: ClassType[] } = {
      classes: [
        { ...classDefault, label: 'Class 1 Edited', id: '1' },
        { ...classDefault, label: 'Class 2 Edited', id: '2' },
      ],
    };
    const expectedActions: ActionObj[] = [{ type: REPLACE_DATA, payload: testData }];

    expect.assertions(1);
    store.dispatch(dataActions.replace(testData, callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('create() should return expected action', () => {
    const expectedActions: ActionObj[] = [{ type: CREATE_DATA }];

    expect.assertions(1);
    store.dispatch(dataActions.create(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('created() should return the expected action', () => {
    const expectedActions: ActionObj = { type: DATA_CREATED };
    expect(dataActions.created()).toEqual(expectedActions);
  });

  test('load() should return expected action', () => {
    const expectedActions: ActionObj[] = [{ type: LOAD_DATA }];

    expect.assertions(1);
    store.dispatch(dataActions.load(callback));
    expect(store.getActions()).toEqual(expectedActions);
    store.clearActions();
  });

  test('loaded() should return the expected action', () => {
    let testPayload: {} = {};
    const expectedActions: ActionObj = { type: DATA_LOADED, payload: testPayload };
    expect(dataActions.loaded(testPayload)).toEqual(expectedActions);
  });

  test('persistenceSuccess() should return the expected action', () => {
    const expectedActions: ActionObj = {
      type: PERSISTING_SUCCESS,
      payload: { dataType: testDataType },
    };
    expect(dataActions.persistenceSuccess(testDataType)).toEqual(expectedActions);
  });

  test('persistenceError() should return the expected action', () => {
    const expectedActions: ActionObj = {
      type: PERSISTING_ERROR,
      payload: { dataType: testDataType },
    };
    expect(dataActions.persistenceError(testDataType)).toEqual(expectedActions);
  });
});

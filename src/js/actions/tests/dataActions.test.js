// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as dataActions from '../dataActions';
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

/**
 * Data Actions Tests
 */

describe('Actions: classActions:', () => {
  let testDataType = 'class';
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({});
  });

  test('replace() should return expected action', () => {
    const TEST_DATA = {
      classes: [
        { label: 'Class 1 Edited', id: '1' },
        { label: 'Class 2 Edited', id: '2' },
      ],
    };
    const EXPECTED_ACTIONS = [{ type: REPLACE_DATA, payload: TEST_DATA }];

    expect.assertions(1);
    store.dispatch(dataActions.replace(TEST_DATA, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('create() should return expected action', () => {
    const EXPECTED_ACTIONS = [{ type: CREATE_DATA }];

    expect.assertions(1);
    store.dispatch(dataActions.create(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('created() should return the expected action', () => {
    const EXPECTED_ACTIONS = { type: DATA_CREATED };
    expect(dataActions.created()).toEqual(EXPECTED_ACTIONS);
  });

  test('load() should return expected action', () => {
    const EXPECTED_ACTIONS = [{ type: LOAD_DATA }];

    expect.assertions(1);
    store.dispatch(dataActions.load(callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('loaded() should return the expected action', () => {
    let testPayload = {};
    const EXPECTED_ACTIONS = { type: DATA_LOADED, payload: testPayload };
    expect(dataActions.loaded(testPayload)).toEqual(EXPECTED_ACTIONS);
  });

  test('persistenceSuccess() should return the expected action', () => {
    const EXPECTED_ACTIONS = {
      type: PERSISTING_SUCCESS,
      payload: { dataType: testDataType },
    };
    expect(dataActions.persistenceSuccess(testDataType)).toEqual(
      EXPECTED_ACTIONS
    );
  });

  test('persistenceError() should return the expected action', () => {
    const EXPECTED_ACTIONS = {
      type: PERSISTING_ERROR,
      payload: { dataType: testDataType },
    };
    expect(dataActions.persistenceError(testDataType)).toEqual(
      EXPECTED_ACTIONS
    );
  });
});

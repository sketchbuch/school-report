// @flow

import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as pupilActions from '../pupilActions';
import {
  ADD_PUPIL,
  DELETE_ALL_CLASS_PUPILS,
  REPLACE_PUPILS,
  DELETE_PUPIL,
  UPDATE_PUPIL,
} from '../../constants/actionTypes';
import pupilDefault from '../../types/pupil';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

/**
 * Pupil Actions Tests
 */

describe('Actions: pupilActions:', () => {
  let testPupil = { ...pupilDefault, id: 'p1', label: 'Pupil', classId: 'c1' };
  let callback = () => {};
  let store = () => {};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ pupils: [] });
  });

  test('replace() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: REPLACE_PUPILS, payload: [testPupil] }];

    expect.assertions(1);
    store.dispatch(pupilActions.replace([testPupil], callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('update() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: UPDATE_PUPIL, payload: testPupil }];

    expect.assertions(1);
    store.dispatch(pupilActions.update(testPupil, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('add() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: ADD_PUPIL, payload: testPupil }];

    expect.assertions(1);
    store.dispatch(pupilActions.add(testPupil, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deleteOne dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{ type: DELETE_PUPIL, payload: { id: 'p1' } }];

    expect.assertions(1);
    store.dispatch(pupilActions.deleteOne('p1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });

  test('deletePupils dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: DELETE_ALL_CLASS_PUPILS, payload: { id: 'c1' } },
    ];

    expect.assertions(1);
    store.dispatch(pupilActions.deletePupils('c1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    store.clearActions();
  });
});

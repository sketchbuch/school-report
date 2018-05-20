// @flow

import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import * as pupilActions from '../pupilActions';
import { REPLACE_PUPILS, ADD_PUPIL, DELETE_ALL_CLASS_PUPILS } from '../../constants/actionTypes';
import pupilDefault from '../../types/pupil';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);


/**
* Pupil Actions Tests
*/

describe('Actions: pupilActions:', () => {
  let testPupil = {...pupilDefault, id: 'p1', label: 'Pupil', classId: 'c1'};
  let callback = ()=>{};
  let store = ()=>{};

  beforeEach(() => {
    callback = jest.fn();
    store = mockStore({ pupils: [] });
  });

  test('replace() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: REPLACE_PUPILS, payload: [testPupil] },
    ];

    store.dispatch(pupilActions.replace([testPupil], callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
  });

  test('add() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      { type: ADD_PUPIL, payload: testPupil },
    ];

    store.dispatch(pupilActions.add(testPupil, callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
  });

  test('deleteClass() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [
      {
        type: DELETE_ALL_CLASS_PUPILS,
        payload: { id: 'c1' },
      },
    ];

    store.dispatch(pupilActions.deletePupils('c1', callback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
  });
});

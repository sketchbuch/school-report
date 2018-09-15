// @flow

import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import * as builderActions from '../builderActions';
import persist from '../../fs/persist';
import {
  SAVE_BUILDER,
} from '../../constants/actionTypes';

const middlewares = [thunk]
const mockStore = configureMockStore(middlewares);
let mockCallback = jest.fn();

jest.mock('../../fs/persist', () => jest.fn(()=>{
    mockCallback();
  })
);


/**
* Builder Actions Tests
*/

describe('Actions: builderActions:', () => {
  const selected = [];
  const REPORT_ID = 'r1';
  const CLASS_ID = 'c1';
  const PUPIL_ID = 'p1';
  let store = ()=>{};

  beforeEach(() => {
    mockCallback = jest.fn();
    store = mockStore({ builder: {} });
  });

  test('save() dispatches the correct action', () => {
    const EXPECTED_ACTIONS = [{
      type: SAVE_BUILDER,
      payload: { selected },
      meta: {
        reportId: REPORT_ID,
        classId: CLASS_ID,
        pupilId: PUPIL_ID,
      },
    }];

    expect.assertions(3);
    store.dispatch(builderActions.save(REPORT_ID, CLASS_ID, PUPIL_ID, selected, mockCallback));
    expect(store.getActions()).toEqual(EXPECTED_ACTIONS);
    expect(persist).toHaveBeenCalled();
    expect(mockCallback).toHaveBeenCalled();
    store.clearActions();
  });
});
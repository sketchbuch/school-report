// @flow

import reducer from '../classes';
import {
  ADD_CLASS,
  DATA_LOADED,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  REPLACE_CLASSES,
  REPLACE_DATA,
  UPDATE_CLASS,
} from '../../constants/actionTypes';
import classDefault from '../../types/class';
import reduce from '../../utils/reducers';

/**
 * Classes Reducer Tests
 */

describe('Reducer: Classes', () => {
  const INITIAL_STATE = [{ ...classDefault, label: 'Class 1', id: 'c1' }];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no classes array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_DATA,
        payload: { classes: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no classes array', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: DATA_LOADED,
        payload: { classes: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CLASSES should return the initial state if payload has no classes array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_CLASSES, payload: {} })).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_CLASSES,
        payload: { classes: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CLASSES should return payload replacing existing classes.', () => {
    const TEST_CLASSES = {
      classes: [{ ...classDefault, label: 'Class 2', id: 'c2' }, { ...classDefault, label: 'Class 3', id: 'c3' }],
    };
    const reducerResult = reducer(INITIAL_STATE, {
      type: REPLACE_CLASSES,
      payload: TEST_CLASSES,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(TEST_CLASSES.classes));
  });

  test('UPDATE_CLASS should update existing categories', () => {
    const NEW_CAT = { ...classDefault, label: 'Class 1 Edited', id: 'c1' };
    const EXPECTED_RESULT = [{ ...NEW_CAT }];
    const reducerResult = reducer(INITIAL_STATE, {
      type: UPDATE_CLASS,
      payload: NEW_CAT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_CLASS should add the payload to existing classes.', () => {
    const NEW_CLASS = { ...classDefault, label: 'Class 2', id: 'c2' };
    const EXPECTED_RESULT = [{ ...INITIAL_STATE[0] }, { ...NEW_CLASS }];
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_CLASS,
      payload: NEW_CLASS,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_CLASS should not add the class if the ID already exists', () => {
    const NEW_CLASS = { ...classDefault, label: 'Class 2', id: 'c1' };
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_CLASS,
      payload: NEW_CLASS,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(INITIAL_STATE));
  });

  test('DELETE_CLASS should delete the category if the ID is found', () => {
    const INITIAL_STATE_DEL = [
      { ...classDefault, label: 'Class 1', id: 'c1' },
      { ...classDefault, label: 'Class 2', id: 'c2' },
      { ...classDefault, label: 'Class 3', id: 'c3' },
    ];
    const EXPECTED_STATE_DEL = reduce.arr.removeObj(INITIAL_STATE_DEL, INITIAL_STATE_DEL[1]);
    const reducerResult = reducer(INITIAL_STATE_DEL, {
      type: DELETE_CLASS,
      payload: INITIAL_STATE_DEL[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_STATE_DEL));
  });

  test('DELETE_ALL_CLASSES should return an empty array', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: DELETE_ALL_CLASSES });
    expect(reducerResult).toEqual([]);
  });
});

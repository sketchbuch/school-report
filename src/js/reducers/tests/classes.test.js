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

describe('Reducer: Classes', () => {
  const initialState = [{ ...classDefault, label: 'Class 1', id: 'c1' }];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'IGNORE' })).toEqual(initialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no classes array', () => {
    expect(reducer(initialState, { type: REPLACE_DATA, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_DATA,
        payload: { classes: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('DATA_LOADED should return the initial state if payload has no classes array', () => {
    expect(reducer(initialState, { type: DATA_LOADED, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: DATA_LOADED,
        payload: { classes: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_CLASSES should return the initial state if payload has no classes array', () => {
    expect(reducer(initialState, { type: REPLACE_CLASSES, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_CLASSES,
        payload: { classes: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_CLASSES should return payload replacing existing classes.', () => {
    const testClasses = {
      classes: [{ ...classDefault, label: 'Class 2', id: 'c2' }, { ...classDefault, label: 'Class 3', id: 'c3' }],
    };
    const reducerResult = reducer(initialState, {
      type: REPLACE_CLASSES,
      payload: testClasses,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(testClasses.classes));
  });

  test('UPDATE_CLASS should update existing categories', () => {
    const newCat = { ...classDefault, label: 'Class 1 Edited', id: 'c1' };
    const expectedResult = [{ ...newCat }];
    const reducerResult = reducer(initialState, {
      type: UPDATE_CLASS,
      payload: newCat,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_CLASS should add the payload to existing classes.', () => {
    const newClass = { ...classDefault, label: 'Class 2', id: 'c2' };
    const expectedResult = [{ ...initialState[0] }, { ...newClass }];
    const reducerResult = reducer(initialState, {
      type: ADD_CLASS,
      payload: newClass,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_CLASS should not add the class if the ID already exists', () => {
    const newClass = { ...classDefault, label: 'Class 2', id: 'c1' };
    const reducerResult = reducer(initialState, {
      type: ADD_CLASS,
      payload: newClass,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(initialState));
  });

  test('DELETE_CLASS should delete the category if the ID is found', () => {
    const initialStateDel = [
      { ...classDefault, label: 'Class 1', id: 'c1' },
      { ...classDefault, label: 'Class 2', id: 'c2' },
      { ...classDefault, label: 'Class 3', id: 'c3' },
    ];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[1]);
    const reducerResult = reducer(initialStateDel, {
      type: DELETE_CLASS,
      payload: initialStateDel[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_ALL_CLASSES should return an empty array', () => {
    const reducerResult = reducer(initialState, { type: DELETE_ALL_CLASSES });
    expect(reducerResult).toEqual([]);
  });
});

// @flow

import reducer from '../reports';
import {
  ADD_REPORT,
  DATA_LOADED,
  DELETE_ALL_REPORTS,
  DELETE_REPORT,
  REPLACE_DATA,
  REPLACE_REPORTS,
  UPDATE_REPORT,
} from '../../constants/actionTypes';
import reportDefault from '../../types/report';
import reduce from '../../utils/reducers';

describe('Reducer: Reports', () => {
  const initialState = [
    { ...reportDefault, label: 'Report 1', id: 'r1' },
    { ...reportDefault, label: 'Report 2', id: 'r2' },
    { ...reportDefault, label: 'Report 3', id: 'r3' },
  ];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'IGNORE' })).toEqual(initialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no reports array', () => {
    expect(reducer(initialState, { type: REPLACE_DATA, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_DATA,
        payload: { reports: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('DATA_LOADED should return the initial state if payload has no reports array', () => {
    expect(reducer(initialState, { type: DATA_LOADED, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: DATA_LOADED,
        payload: { reports: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_REPORTS should return the initial state if payload has no reports array', () => {
    expect(reducer(initialState, { type: REPLACE_REPORTS, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_REPORTS,
        payload: { reports: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_REPORTS should return payload replacing existing reports.', () => {
    const testTexts = {
      reports: [
        { ...reportDefault, label: 'Report 4', id: 'r4' },
        { ...reportDefault, label: 'Report 5', id: 'r5' },
        { ...reportDefault, label: 'Report 6', id: 'r6' },
      ],
    };
    const reducerResult = reducer(initialState, {
      type: REPLACE_REPORTS,
      payload: testTexts,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(testTexts.reports));
  });

  test('UPDATE_REPORT should update existing reports', () => {
    const newReport = { ...reportDefault, label: 'Report 3 Edited', id: 'r3' };
    const expectedResult = [{ ...initialState[0] }, { ...initialState[1] }, { ...newReport }];
    const reducerResult = reducer(initialState, {
      type: UPDATE_REPORT,
      payload: newReport,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_REPORT should add the payload to existing reports', () => {
    const newReport = { ...reportDefault, label: 'Report 7', id: 't7' };
    const expectedResult = [...initialState, { ...newReport }];
    const reducerResult = reducer(initialState, {
      type: ADD_REPORT,
      payload: newReport,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_REPORT should not add the report if the ID already exists', () => {
    const newReport = { ...reportDefault, label: 'Report 1', id: 'r1' };
    const reducerResult = reducer(initialState, {
      type: ADD_REPORT,
      payload: newReport,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(initialState));
  });

  test('DELETE_REPORT should delete the report if the ID is found', () => {
    const initialStateDel = [...initialState];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[1]);

    const reducerResult = reducer(initialStateDel, {
      type: DELETE_REPORT,
      payload: initialStateDel[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_ALL_REPORTS should return an empty array', () => {
    const reducerResult = reducer(initialState, { type: DELETE_ALL_REPORTS });
    expect(reducerResult).toEqual([]);
  });
});

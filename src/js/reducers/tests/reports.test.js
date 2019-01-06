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

/**
 * Reports Reducer Tests
 */

describe('Reducer: Reports', () => {
  const INITIAL_STATE = [
    { ...reportDefault, label: 'Report 1', id: 'r1' },
    { ...reportDefault, label: 'Report 2', id: 'r2' },
    { ...reportDefault, label: 'Report 3', id: 'r3' },
  ];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no reports array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_DATA,
        payload: { reports: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no reports array', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: DATA_LOADED,
        payload: { reports: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_REPORTS should return the initial state if payload has no reports array', () => {
    expect(
      reducer(INITIAL_STATE, { type: REPLACE_REPORTS, payload: {} })
    ).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_REPORTS,
        payload: { reports: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_REPORTS should return payload replacing existing reports.', () => {
    const TEST_TEXTS = {
      reports: [
        { ...reportDefault, label: 'Report 4', id: 'r4' },
        { ...reportDefault, label: 'Report 5', id: 'r5' },
        { ...reportDefault, label: 'Report 6', id: 'r6' },
      ],
    };
    const reducerResult = reducer(INITIAL_STATE, {
      type: REPLACE_REPORTS,
      payload: TEST_TEXTS,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(TEST_TEXTS.reports)
    );
  });

  test('UPDATE_REPORT should update existing reports', () => {
    const NEW_REPORT = { ...reportDefault, label: 'Report 3 Edited', id: 'r3' };
    const EXPECTED_RESULT = [
      { ...INITIAL_STATE[0] },
      { ...INITIAL_STATE[1] },
      { ...NEW_REPORT },
    ];
    const reducerResult = reducer(INITIAL_STATE, {
      type: UPDATE_REPORT,
      payload: NEW_REPORT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_RESULT)
    );
  });

  test('ADD_REPORT should add the payload to existing reports', () => {
    const NEW_REPORT = { ...reportDefault, label: 'Report 7', id: 't7' };
    const EXPECTED_RESULT = [...INITIAL_STATE, { ...NEW_REPORT }];
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_REPORT,
      payload: NEW_REPORT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_RESULT)
    );
  });

  test('ADD_REPORT should not add the report if the ID already exists', () => {
    const NEW_REPORT = { ...reportDefault, label: 'Report 1', id: 'r1' };
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_REPORT,
      payload: NEW_REPORT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(INITIAL_STATE)
    );
  });

  test('DELETE_REPORT should delete the report if the ID is found', () => {
    const INITIAL_STATE_DEL = [...INITIAL_STATE];
    const EXPECTED_STATE_DEL = reduce.arr.removeObj(
      INITIAL_STATE_DEL,
      INITIAL_STATE_DEL[1]
    );

    const reducerResult = reducer(INITIAL_STATE_DEL, {
      type: DELETE_REPORT,
      payload: INITIAL_STATE_DEL[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_STATE_DEL)
    );
  });

  test('DELETE_ALL_REPORTS should return an empty array', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: DELETE_ALL_REPORTS });
    expect(reducerResult).toEqual([]);
  });
});

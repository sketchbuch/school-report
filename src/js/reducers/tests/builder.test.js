// @flow

import reducer from '../builder';
import {
  DATA_LOADED,
  REPLACE_BUILDER,
  REPLACE_DATA,
} from '../../constants/actionTypes';

/**
 * Builder Reducer Tests
 */

describe('Reducer: Categories', () => {
  const INITIAL_STATE = {};
  const TEST_BUILDER = {
    builder: {
      r1: {
        c1: {
          p1: ['t1', 't2'],
        },
      },
      r2: {
        c2: {
          p2: ['t1', 't2'],
          p3: ['t5', 't8', 't9'],
        },
        c3: {
          p4: ['t1', 't2'],
          p5: ['t5', 't8', 't9'],
          p6: ['t3', 't4', 't5', 't6'],
          p7: ['t5', 't9'],
        },
      },
    },
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no builder object', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_DATA,
        payload: { builder: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no builder object', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: DATA_LOADED,
        payload: { builder: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_BUILDER should return the initial state if payload has no builder object', () => {
    expect(
      reducer(INITIAL_STATE, { type: REPLACE_BUILDER, payload: {} })
    ).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_BUILDER,
        payload: { builder: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_BUILDER should return payload replacing existing builder object', () => {
    const reducerResult = reducer(INITIAL_STATE, {
      type: REPLACE_BUILDER,
      payload: TEST_BUILDER,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(TEST_BUILDER.builder)
    );
  });
});

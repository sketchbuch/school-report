// @flow

import reducer from '../pupils';
import { REPLACE_PUPILS, ADD_PUPIL } from '../../constants/actionTypes';
import pupilDefault from '../../types/pupil';

/**
* Pupils Reducer Tests
*/

describe('Reducer: appLoaded', () => {
  const INITIAL_STATE = [];
  const TEST_PUPILS = {
    pupils: [{
      ...pupilDefault,
      classId: 'c1',
      firstname: 'John',
      gender: 'm',
      id: 'p1',
      lastname: 'Smith',
    }]
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('REPLACE_PUPILS should return the initial state if payload has no pupils object', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: null })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: {pupils: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_PUPILS should return payload replacing existing pupils.', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: TEST_PUPILS });

    expect(reducerResult).toHaveLength(TEST_PUPILS.pupils.length);
    expect(reducerResult[0].firstname).toBe(TEST_PUPILS.pupils[0].firstname);
  });

  test('ADD_PUPIL should add the payload to existing pupils.', () => {
    const NEW_PUPIL = {
      ...pupilDefault,
      classId: 'c2',
      firstname: 'Jane',
      gender: 'f',
      id: 'p2',
      lastname: 'Smith',
    };
    const EXPECTED_RESULT = [...TEST_PUPILS.pupils].concat(NEW_PUPIL);
    const reducerResult = reducer(TEST_PUPILS.pupils, { type: ADD_PUPIL, payload: NEW_PUPIL });

    expect(reducerResult).toHaveLength(EXPECTED_RESULT.length);
    expect(reducerResult[1].firstname).toBe(NEW_PUPIL.firstname);
  });

  test('ADD_PUPIL should not add the pupil if the ID already exists', () => {
    const NEW_PUPIL = {
      ...pupilDefault,
      classId: 'c1',
      firstname: 'John',
      gender: 'm',
      id: 'p1',
      lastname: 'Smith',
    };
    const reducerResult = reducer(TEST_PUPILS.pupils, { type: ADD_PUPIL, payload: NEW_PUPIL });

    expect(reducerResult).toHaveLength(TEST_PUPILS.pupils.length);
    expect(reducerResult[0].firstname).toBe(TEST_PUPILS.pupils[0].firstname);
  });
});

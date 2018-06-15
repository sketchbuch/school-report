// @flow

import reducer from '../pupils';
import {
  ADD_PUPIL,
  DATA_LOADED,
  DELETE_ALL_CLASS_PUPILS,
  DELETE_ALL_CLASSES,
  DELETE_CLASS,
  DELETE_PUPIL,
  REPLACE_DATA,
  REPLACE_PUPILS,
  UPDATE_PUPIL,
} from '../../constants/actionTypes';
import pupilDefault from '../../types/pupil';

/**
* Pupils Reducer Tests
*/

describe('Reducer: Pupils', () => {
  const INITIAL_STATE = [
    {...pupilDefault, firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' }
  ];
  const TEST_PUPILS = {
    pupils: [
      {...pupilDefault, classId: 'c1', firstname: 'Dave', gender: 'm', id: 'p2', lastname: 'Lister' },
      {...pupilDefault, classId: 'c1', firstname: 'Holly', gender: 'f', id: 'p3', lastname: '(Computer)' },
    ]
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no pupils array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {pupils: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no pupils array', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {pupils: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_PUPILS should return the initial state if payload has no pupils array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: {pupils: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_PUPILS should return payload replacing existing pupils.', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: REPLACE_PUPILS, payload: TEST_PUPILS });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(TEST_PUPILS.pupils));
  });

  test('UPDATE_PUPIL should update existing pupils', () => {
    const NEW_PUPIL = {...pupilDefault, lastname: 'Rimmer (Edited)', id: 'p1' };
    const EXPECTED_RESULT = [{...NEW_PUPIL}];
    const reducerResult = reducer(INITIAL_STATE, { type: UPDATE_PUPIL, payload: NEW_PUPIL });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_PUPIL should add the payload to existing pupils.', () => {
    const NEW_PUPIL = { ...pupilDefault, classId: 'c2', firstname: 'The', gender: 'm',  id: 'p4', lastname: 'Cat' };
    const EXPECTED_RESULT = [...TEST_PUPILS.pupils].concat(NEW_PUPIL);
    const reducerResult = reducer(TEST_PUPILS.pupils, { type: ADD_PUPIL, payload: NEW_PUPIL });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_PUPIL should not add the pupil if the ID already exists', () => {
    const NEW_PUPIL = {...pupilDefault, classId: 'c1', firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' };
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_PUPIL, payload: NEW_PUPIL });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(INITIAL_STATE));
  });

  test('DELETE_PUPIL should delete the category if the ID is found', () => {
    const INITIAL_STATE_DEL = [
      {...pupilDefault, classId: 'c1', firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' },
      {...pupilDefault, classId: 'c1', firstname: 'Dave', gender: 'm', id: 'p2', lastname: 'Lister' },
      {...pupilDefault, classId: 'c1', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
    ];
    const EXPECTED_STATE_DEL = [
      {...pupilDefault, classId: 'c1', firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' },
      {...pupilDefault, classId: 'c1', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
    ];
    const reducerResult = reducer(INITIAL_STATE_DEL, { type: DELETE_PUPIL, payload: INITIAL_STATE_DEL[1] });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_STATE_DEL));
  });

  test('DELETE_ALL_CLASSES should return an empty array', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: DELETE_ALL_CLASSES });
    expect(reducerResult).toEqual([]);
  });

  test('DELETE_ALL_CLASS_PUPILS should remove all pupils for the deleted class', () => {
    const INITIAL_STATE_DEL = [
      {...pupilDefault, classId: 'c1', firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' },
      {...pupilDefault, classId: 'c1', firstname: 'Dave', gender: 'm', id: 'p2', lastname: 'Lister' },
      {...pupilDefault, classId: 'c3', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
      {...pupilDefault, classId: 'c2', firstname: 'Holly', gender: 'f', id: 'p4', lastname: '(Computer)' },
    ];
    const EXPECTED_STATE_DEL = [
      {...pupilDefault, classId: 'c3', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
      {...pupilDefault, classId: 'c2', firstname: 'Holly', gender: 'f', id: 'p4', lastname: '(Computer)' },
    ];
    const reducerResult = reducer(INITIAL_STATE_DEL, { type: DELETE_ALL_CLASS_PUPILS, payload: { id: 'c1' } });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_STATE_DEL));
  });

  test('DELETE_CLASS should remove all pupils for the deleted class', () => {
    const INITIAL_STATE_DEL = [
      {...pupilDefault, classId: 'c1', firstname: 'Arnold', gender: 'm', id: 'p1', lastname: 'Rimmer' },
      {...pupilDefault, classId: 'c1', firstname: 'Dave', gender: 'm', id: 'p2', lastname: 'Lister' },
      {...pupilDefault, classId: 'c3', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
      {...pupilDefault, classId: 'c2', firstname: 'Holly', gender: 'f', id: 'p4', lastname: '(Computer)' },
    ];
    const EXPECTED_STATE_DEL = [
      {...pupilDefault, classId: 'c3', firstname: 'The', gender: 'm', id: 'p3', lastname: 'Cat' },
      {...pupilDefault, classId: 'c2', firstname: 'Holly', gender: 'f', id: 'p4', lastname: '(Computer)' },
    ];
    const reducerResult = reducer(INITIAL_STATE_DEL, { type: DELETE_CLASS, payload: { id: 'c1' } });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_STATE_DEL));
  });
});

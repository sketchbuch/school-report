// @flow

import reducer from '../texts';
import {
  ADD_TEXT,
  DATA_LOADED,
  DELETE_ALL_TEXTS,
  DELETE_TEXT,
  REPLACE_DATA,
  REPLACE_TEXTS,
  UPDATE_TEXT,
} from '../../constants/actionTypes';
import textDefault from '../../types/text';
import reduce from '../../utils/reducers';

/**
 * Texts Reducer Tests
 */

describe('Reducer: Texts', () => {
  const INITIAL_STATE = [
    { ...textDefault, bodytext: 'Text 1', id: 't1' },
    { ...textDefault, bodytext: 'Text 2', id: 't2' },
    { ...textDefault, bodytext: 'Text 3', id: 't3' },
  ];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no texts array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_DATA,
        payload: { texts: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no texts array', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(
      INITIAL_STATE
    );
    expect(
      reducer(INITIAL_STATE, { type: DATA_LOADED, payload: { texts: 'wrong' } })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_TEXTS should return the initial state if payload has no texts array', () => {
    expect(
      reducer(INITIAL_STATE, { type: REPLACE_TEXTS, payload: {} })
    ).toEqual(INITIAL_STATE);
    expect(
      reducer(INITIAL_STATE, {
        type: REPLACE_TEXTS,
        payload: { texts: 'wrong' },
      })
    ).toEqual(INITIAL_STATE);
  });

  test('REPLACE_TEXTS should return payload replacing existing texts.', () => {
    const TEST_TEXTS = {
      texts: [
        { ...textDefault, bodytext: 'Text 4', id: 't4' },
        { ...textDefault, bodytext: 'Text 5', id: 't5' },
        { ...textDefault, bodytext: 'Text 6', id: 't6' },
      ],
    };
    const reducerResult = reducer(INITIAL_STATE, {
      type: REPLACE_TEXTS,
      payload: TEST_TEXTS,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(TEST_TEXTS.texts)
    );
  });

  test('UPDATE_TEXT should update existing texts', () => {
    const NEW_TEXT = { ...textDefault, bodytext: 'Text 3 Edited', id: 't3' };
    const EXPECTED_RESULT = [
      { ...INITIAL_STATE[0] },
      { ...INITIAL_STATE[1] },
      { ...NEW_TEXT },
    ];
    const reducerResult = reducer(INITIAL_STATE, {
      type: UPDATE_TEXT,
      payload: NEW_TEXT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_RESULT)
    );
  });

  test('ADD_TEXT should add the payload to existing texts', () => {
    const NEW_TEXT = { ...textDefault, bodytext: 'Text 7', id: 't7' };
    const EXPECTED_RESULT = [...INITIAL_STATE, { ...NEW_TEXT }];
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_TEXT,
      payload: NEW_TEXT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_RESULT)
    );
  });

  test('ADD_TEXT should not add the text if the ID already exists', () => {
    const NEW_TEXT = { ...textDefault, bodytext: 'Text 1', id: 't1' };
    const reducerResult = reducer(INITIAL_STATE, {
      type: ADD_TEXT,
      payload: NEW_TEXT,
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(INITIAL_STATE)
    );
  });

  test('DELETE_TEXT should delete the text if the ID is found', () => {
    const INITIAL_STATE_DEL = [...INITIAL_STATE];
    const EXPECTED_STATE_DEL = reduce.arr.removeObj(
      INITIAL_STATE_DEL,
      INITIAL_STATE_DEL[1]
    );

    const reducerResult = reducer(INITIAL_STATE_DEL, {
      type: DELETE_TEXT,
      payload: INITIAL_STATE_DEL[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(
      JSON.stringify(EXPECTED_STATE_DEL)
    );
  });

  test('DELETE_ALL_TEXTS should return an empty array', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: DELETE_ALL_TEXTS });
    expect(reducerResult).toEqual([]);
  });
});

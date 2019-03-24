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

describe('Reducer: Texts', () => {
  const initialState = [
    { ...textDefault, bodytext: 'Text 1', id: 't1' },
    { ...textDefault, bodytext: 'Text 2', id: 't2' },
    { ...textDefault, bodytext: 'Text 3', id: 't3' },
  ];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'IGNORE' })).toEqual(initialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no texts array', () => {
    expect(reducer(initialState, { type: REPLACE_DATA, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_DATA,
        payload: { texts: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('DATA_LOADED should return the initial state if payload has no texts array', () => {
    expect(reducer(initialState, { type: DATA_LOADED, payload: {} })).toEqual(initialState);
    expect(reducer(initialState, { type: DATA_LOADED, payload: { texts: 'wrong' } })).toEqual(initialState);
  });

  test('REPLACE_TEXTS should return the initial state if payload has no texts array', () => {
    expect(reducer(initialState, { type: REPLACE_TEXTS, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_TEXTS,
        payload: { texts: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_TEXTS should return payload replacing existing texts.', () => {
    const testTexts = {
      texts: [
        { ...textDefault, bodytext: 'Text 4', id: 't4' },
        { ...textDefault, bodytext: 'Text 5', id: 't5' },
        { ...textDefault, bodytext: 'Text 6', id: 't6' },
      ],
    };
    const reducerResult = reducer(initialState, {
      type: REPLACE_TEXTS,
      payload: testTexts,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(testTexts.texts));
  });

  test('UPDATE_TEXT should update existing texts', () => {
    const newText = { ...textDefault, bodytext: 'Text 3 Edited', id: 't3' };
    const expectedResult = [{ ...initialState[0] }, { ...initialState[1] }, { ...newText }];
    const reducerResult = reducer(initialState, {
      type: UPDATE_TEXT,
      payload: newText,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_TEXT should add the payload to existing texts', () => {
    const newText = { ...textDefault, bodytext: 'Text 7', id: 't7' };
    const expectedResult = [...initialState, { ...newText }];
    const reducerResult = reducer(initialState, {
      type: ADD_TEXT,
      payload: newText,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_TEXT should not add the text if the ID already exists', () => {
    const newText = { ...textDefault, bodytext: 'Text 1', id: 't1' };
    const reducerResult = reducer(initialState, {
      type: ADD_TEXT,
      payload: newText,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(initialState));
  });

  test('DELETE_TEXT should delete the text if the ID is found', () => {
    const initialStateDel = [...initialState];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[1]);

    const reducerResult = reducer(initialStateDel, {
      type: DELETE_TEXT,
      payload: initialStateDel[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_ALL_TEXTS should return an empty array', () => {
    const reducerResult = reducer(initialState, { type: DELETE_ALL_TEXTS });
    expect(reducerResult).toEqual([]);
  });
});

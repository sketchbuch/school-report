// @flow

import reducer from '../categories';
import {
  ADD_CATEGORY,
  DATA_LOADED,
  DELETE_ALL_CATEGORIES,
  DELETE_CATEGORY,
  REPLACE_CATEGORIES, 
  REPLACE_DATA,
  UPDATE_CATEGORY,
} from '../../constants/actionTypes';
import categoryDefault from '../../types/category';


/**
* Categories Reducer Tests
*/

describe('Reducer: Categories', () => {
  const INITIAL_STATE = [
    {...categoryDefault, label: 'Category 1', id: 'c1' }
  ];
  const TEST_CATEGORIES = {
    categories: [
      {...categoryDefault, label: 'Category 2', id: 'c2' },
      {...categoryDefault, label: 'Category 3', id: 'c3' }
    ]
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, { type: 'IGNORE' })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_DATA should return the initial state if payload has no categories array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_DATA, payload: {categories: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('DATA_LOADED should return the initial state if payload has no categories array', () => {
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: DATA_LOADED, payload: {categories: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CATEGORIES should return the initial state if payload has no categories array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: {categories: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CATEGORIES should return payload replacing existing categories', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: TEST_CATEGORIES });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(TEST_CATEGORIES.categories));
  });

  test('UPDATE_CATEGORY should update existing categories', () => {
    const NEW_CAT = {...categoryDefault, label: 'Category 1 Edited', id: 'c1' };
    const EXPECTED_RESULT = [{...NEW_CAT}];
    const reducerResult = reducer(INITIAL_STATE, { type: UPDATE_CATEGORY, payload: NEW_CAT });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_CATEGORY should add the payload to existing categories', () => {
    const NEW_CAT = {...categoryDefault, label: 'Category 2', id: 'c2' };
    const EXPECTED_RESULT = [{...INITIAL_STATE[0]}, {...NEW_CAT}];
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CATEGORY, payload: NEW_CAT });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_RESULT));
  });

  test('ADD_CATEGORY should not add the category if the ID already exists', () => {
    const NEW_CAT = {...categoryDefault, label: 'Category 1', id: 'c1' };
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CATEGORY, payload: NEW_CAT });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(INITIAL_STATE));
  });

  test('DELETE_CATEGORY should delete the category if the ID is found', () => {
    const INITIAL_STATE_DEL = [
      {...categoryDefault, label: 'Category 1', id: 'c1' },
      {...categoryDefault, label: 'Category 2', id: 'c2' },
      {...categoryDefault, label: 'Category 3', id: 'c3' },
    ];
    const EXPECTED_STATE_DEL = [
      {...categoryDefault, label: 'Category 1', id: 'c1' },
      {...categoryDefault, label: 'Category 3', id: 'c3' },
    ];
    const reducerResult = reducer(INITIAL_STATE_DEL, { type: DELETE_CATEGORY, payload: INITIAL_STATE_DEL[1] });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(EXPECTED_STATE_DEL));
  });

  test('DELETE_ALL_CATEGORIES should return an empty array', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: DELETE_ALL_CATEGORIES });
    expect(reducerResult).toEqual([]);
  });
});

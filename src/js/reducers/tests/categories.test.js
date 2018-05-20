// @flow

import reducer from '../categories';
import { REPLACE_CATEGORIES, ADD_CATEGORY } from '../../constants/actionTypes';
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
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CATEGORIES should return the initial state if payload has no categories array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: null })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: {classes: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CATEGORIES should return payload replacing existing categories.', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: REPLACE_CATEGORIES, payload: TEST_CATEGORIES });

    TEST_CATEGORIES.categories.forEach((ele, index) => {
      expect(JSON.stringify(reducerResult[index])).toEqual(JSON.stringify(TEST_CATEGORIES.categories[index]));
    });
    expect(reducerResult).toHaveLength(TEST_CATEGORIES.categories.length);
    expect(reducerResult[0].label).toBe('Category 2');
  });

  test('ADD_CATEGORY should add the payload to existing categories.', () => {
    const NEW_CLASS = {...categoryDefault, label: 'Category 2', id: 'c2' };
    const EXPECTED_RESULT = [{...INITIAL_STATE[0]}, {...NEW_CLASS}];
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CATEGORY, payload: NEW_CLASS });

    expect((JSON.stringify(reducerResult))).toEqual(JSON.stringify(EXPECTED_RESULT));
    expect(reducerResult).toHaveLength(EXPECTED_RESULT.length);
    expect(reducerResult[1].label).toBe(NEW_CLASS.label);
  });

  test('ADD_CATEGORY should not add the class if the ID already exists', () => {
    const NEW_CLASS = {...categoryDefault, label: 'Category 2', id: 'c1' };
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CATEGORY, payload: NEW_CLASS });

    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(INITIAL_STATE));
    expect(reducerResult).toHaveLength(INITIAL_STATE.length);
    expect(reducerResult[0].label).toBe(INITIAL_STATE[0].label);
  });
});

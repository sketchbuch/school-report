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
import reduce from '../../utils/reducers';

describe('Reducer: Categories', () => {
  const inititialState = [{ ...categoryDefault, label: 'Category 1', id: 'c1' }];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(inititialState, { type: 'IGNORE' })).toEqual(inititialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no categories array', () => {
    expect(reducer(inititialState, { type: REPLACE_DATA, payload: {} })).toEqual(inititialState);
    expect(
      reducer(inititialState, {
        type: REPLACE_DATA,
        payload: { categories: 'wrong' },
      })
    ).toEqual(inititialState);
  });

  test('DATA_LOADED should return the initial state if payload has no categories array', () => {
    expect(reducer(inititialState, { type: DATA_LOADED, payload: {} })).toEqual(inititialState);
    expect(
      reducer(inititialState, {
        type: DATA_LOADED,
        payload: { categories: 'wrong' },
      })
    ).toEqual(inititialState);
  });

  test('REPLACE_CATEGORIES should return the initial state if payload has no categories array', () => {
    expect(reducer(inititialState, { type: REPLACE_CATEGORIES, payload: {} })).toEqual(inititialState);
    expect(
      reducer(inititialState, {
        type: REPLACE_CATEGORIES,
        payload: { categories: 'wrong' },
      })
    ).toEqual(inititialState);
  });

  test('REPLACE_CATEGORIES should return payload replacing existing categories', () => {
    const testCategories = {
      categories: [
        { ...categoryDefault, label: 'Category 2', id: 'c2' },
        { ...categoryDefault, label: 'Category 3', id: 'c3' },
      ],
    };

    const reducerResult = reducer(inititialState, {
      type: REPLACE_CATEGORIES,
      payload: testCategories,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(testCategories.categories));
  });

  test('UPDATE_CATEGORY should update existing categories', () => {
    const newCat = {
      ...categoryDefault,
      label: 'Category 1 Edited',
      id: 'c1',
    };
    const expectedResult = [{ ...newCat }];
    const reducerResult = reducer(inititialState, {
      type: UPDATE_CATEGORY,
      payload: newCat,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_CATEGORY should add the payload to existing categories', () => {
    const newCat = { ...categoryDefault, label: 'Category 2', id: 'c2' };
    const expectedResult = [{ ...inititialState[0] }, { ...newCat }];
    const reducerResult = reducer(inititialState, {
      type: ADD_CATEGORY,
      payload: newCat,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_CATEGORY should not add the category if the ID already exists', () => {
    const newCat = { ...categoryDefault, label: 'Category 1', id: 'c1' };
    const reducerResult = reducer(inititialState, {
      type: ADD_CATEGORY,
      payload: newCat,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(inititialState));
  });

  test('DELETE_CATEGORY should delete the category if the ID is found', () => {
    const initialStateDel = [
      { ...categoryDefault, label: 'Category 1', id: 'c1' },
      { ...categoryDefault, label: 'Category 2', id: 'c2' },
      { ...categoryDefault, label: 'Category 3', id: 'c3' },
    ];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[1]);

    const reducerResult = reducer(initialStateDel, {
      type: DELETE_CATEGORY,
      payload: initialStateDel[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_ALL_CATEGORIES should return an empty array', () => {
    const reducerResult = reducer(inititialState, {
      type: DELETE_ALL_CATEGORIES,
    });
    expect(reducerResult).toEqual([]);
  });
});

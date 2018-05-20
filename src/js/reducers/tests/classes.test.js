// @flow

import reducer from '../classes';
import { REPLACE_CLASSES, ADD_CLASS } from '../../constants/actionTypes';
import classDefault from '../../types/class';


/**
* Classes Reducer Tests
*/

describe('Reducer: Classes', () => {
  const INITIAL_STATE = [
    {...classDefault, label: 'Class 1', id: 'c1' }
  ];
  const TEST_CLASSES = {
    classes: [
      {...classDefault, label: 'Class 2', id: 'c2' },
      {...classDefault, label: 'Class 3', id: 'c3' }
    ]
  };

  test('Should return the initial state if no type matches', () => {
    expect(reducer(INITIAL_STATE, {})).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CLASSES should return the initial state if payload has no classes array', () => {
    expect(reducer(INITIAL_STATE, { type: REPLACE_CLASSES, payload: null })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_CLASSES, payload: {} })).toEqual(INITIAL_STATE);
    expect(reducer(INITIAL_STATE, { type: REPLACE_CLASSES, payload: {classes: 'wrong'} })).toEqual(INITIAL_STATE);
  });

  test('REPLACE_CLASSES should return payload replacing existing classes.', () => {
    const reducerResult = reducer(INITIAL_STATE, { type: REPLACE_CLASSES, payload: TEST_CLASSES });

    TEST_CLASSES.classes.forEach((ele, index) => {
      expect(JSON.stringify(reducerResult[index])).toEqual(JSON.stringify(TEST_CLASSES.classes[index]));
    });
    expect(reducerResult).toHaveLength(TEST_CLASSES.classes.length);
    expect(reducerResult[0].label).toBe('Class 2');
  });

  test('ADD_CLASS should add the payload to existing classes.', () => {
    const NEW_CLASS = {...classDefault, label: 'Class 2', id: 'c2' };
    const EXPECTED_RESULT = [{...INITIAL_STATE[0]}, {...NEW_CLASS}];
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CLASS, payload: NEW_CLASS });

    expect((JSON.stringify(reducerResult))).toEqual(JSON.stringify(EXPECTED_RESULT));
    expect(reducerResult).toHaveLength(EXPECTED_RESULT.length);
    expect(reducerResult[1].label).toBe(NEW_CLASS.label);
  });

  test('ADD_CLASS should not add the class if the ID already exists', () => {
    const NEW_CLASS = {...classDefault, label: 'Class 2', id: 'c1' };
    const reducerResult = reducer(INITIAL_STATE, { type: ADD_CLASS, payload: NEW_CLASS });

    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(INITIAL_STATE));
    expect(reducerResult).toHaveLength(INITIAL_STATE.length);
    expect(reducerResult[0].label).toBe(INITIAL_STATE[0].label);
  });
});

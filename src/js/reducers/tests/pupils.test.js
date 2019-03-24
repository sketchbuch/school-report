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
import reduce from '../../utils/reducers';

describe('Reducer: Pupils', () => {
  const initialState = [
    {
      ...pupilDefault,
      firstname: 'Arnold',
      gender: 'm',
      id: 'p1',
      lastname: 'Rimmer',
    },
  ];

  test('Should return the initial state if no type matches', () => {
    expect(reducer(initialState, { type: 'IGNORE' })).toEqual(initialState);
  });

  test('REPLACE_DATA should return the initial state if payload has no pupils array', () => {
    expect(reducer(initialState, { type: REPLACE_DATA, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_DATA,
        payload: { pupils: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('DATA_LOADED should return the initial state if payload has no pupils array', () => {
    expect(reducer(initialState, { type: DATA_LOADED, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: DATA_LOADED,
        payload: { pupils: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_PUPILS should return the initial state if payload has no pupils array', () => {
    expect(reducer(initialState, { type: REPLACE_PUPILS, payload: {} })).toEqual(initialState);
    expect(
      reducer(initialState, {
        type: REPLACE_PUPILS,
        payload: { pupils: 'wrong' },
      })
    ).toEqual(initialState);
  });

  test('REPLACE_PUPILS should return payload replacing existing pupils.', () => {
    const testPupils = {
      pupils: [
        {
          ...pupilDefault,
          classId: 'c1',
          firstname: 'Dave',
          gender: 'm',
          id: 'p2',
          lastname: 'Lister',
        },
        {
          ...pupilDefault,
          classId: 'c1',
          firstname: 'Holly',
          gender: 'f',
          id: 'p3',
          lastname: '(Computer)',
        },
      ],
    };
    const reducerResult = reducer(initialState, {
      type: REPLACE_PUPILS,
      payload: testPupils,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(testPupils.pupils));
  });

  test('UPDATE_PUPIL should update existing pupils', () => {
    const newPupil = {
      ...pupilDefault,
      lastname: 'Rimmer (Edited)',
      id: 'p1',
    };
    const expectedResult = [{ ...newPupil }];
    const reducerResult = reducer(initialState, {
      type: UPDATE_PUPIL,
      payload: newPupil,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_PUPIL should add the payload to existing pupils.', () => {
    const newPupil = {
      ...pupilDefault,
      classId: 'c2',
      firstname: 'The',
      gender: 'm',
      id: 'p4',
      lastname: 'Cat',
    };
    const expectedResult = [{ ...initialState[0] }, { ...newPupil }];
    const reducerResult = reducer(initialState, {
      type: ADD_PUPIL,
      payload: newPupil,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedResult));
  });

  test('ADD_PUPIL should not add the pupil if the ID already exists', () => {
    const newPupil = {
      ...pupilDefault,
      classId: 'c1',
      firstname: 'Arnold',
      gender: 'm',
      id: 'p1',
      lastname: 'Rimmer',
    };
    const reducerResult = reducer(initialState, {
      type: ADD_PUPIL,
      payload: newPupil,
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(initialState));
  });

  test('DELETE_PUPIL should delete the category if the ID is found', () => {
    const initialStateDel = [
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Arnold',
        gender: 'm',
        id: 'p1',
        lastname: 'Rimmer',
      },
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Dave',
        gender: 'm',
        id: 'p2',
        lastname: 'Lister',
      },
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'The',
        gender: 'm',
        id: 'p3',
        lastname: 'Cat',
      },
    ];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[1]);
    const reducerResult = reducer(initialStateDel, {
      type: DELETE_PUPIL,
      payload: initialStateDel[1],
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_ALL_CLASSES should return an empty array', () => {
    const reducerResult = reducer(initialState, { type: DELETE_ALL_CLASSES });
    expect(reducerResult).toEqual([]);
  });

  test('DELETE_ALL_CLASS_PUPILS should remove all pupils for the deleted class', () => {
    const initialStateDel = [
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Arnold',
        gender: 'm',
        id: 'p1',
        lastname: 'Rimmer',
      },
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Dave',
        gender: 'm',
        id: 'p2',
        lastname: 'Lister',
      },
      {
        ...pupilDefault,
        classId: 'c3',
        firstname: 'The',
        gender: 'm',
        id: 'p3',
        lastname: 'Cat',
      },
      {
        ...pupilDefault,
        classId: 'c2',
        firstname: 'Holly',
        gender: 'f',
        id: 'p4',
        lastname: '(Computer)',
      },
    ];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[2]);
    const reducerResult = reducer(initialStateDel, {
      type: DELETE_ALL_CLASS_PUPILS,
      payload: { id: 'c3' },
    });

    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_CLASS should remove all pupils for the deleted class', () => {
    const initialStateDel = [
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Arnold',
        gender: 'm',
        id: 'p1',
        lastname: 'Rimmer',
      },
      {
        ...pupilDefault,
        classId: 'c1',
        firstname: 'Dave',
        gender: 'm',
        id: 'p2',
        lastname: 'Lister',
      },
      {
        ...pupilDefault,
        classId: 'c3',
        firstname: 'The',
        gender: 'm',
        id: 'p3',
        lastname: 'Cat',
      },
      {
        ...pupilDefault,
        classId: 'c2',
        firstname: 'Holly',
        gender: 'f',
        id: 'p4',
        lastname: '(Computer)',
      },
    ];
    const expectedStateDel = reduce.arr.removeObj(initialStateDel, initialStateDel[2]);
    const reducerResult = reducer(initialStateDel, {
      type: DELETE_CLASS,
      payload: { id: 'c3' },
    });

    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(expectedStateDel));
  });

  test('DELETE_CLASS handles undefined ID', () => {
    const reducerResult = reducer(initialState, {
      type: DELETE_CLASS,
      payload: {},
    });
    expect(JSON.stringify(reducerResult)).toEqual(JSON.stringify(initialState));
  });
});

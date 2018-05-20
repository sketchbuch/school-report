// @flow

import pupilDefault, { PupilFactory, getPupilIdStr } from '../pupil';
import { generateId } from '../../utils/ids';

describe('Types: Pupil', () => {
  const pupilObj = {
    ...pupilDefault,
    created: -1,
    description: 'Smeghead!',
    firstname: 'Arnold',
    gender: 'm',
    lastname: 'Rimmer',
    updated: -2,
  };
  const classId = 'c1';
  const ts = Date.now();
  const idStr = getPupilIdStr(pupilObj);
  const id = generateId(idStr, ts);
  const testPupil = {
    ...pupilDefault,
    classId: classId,
    created: ts,
    description: 'Smeghead!',
    firstname: 'Arnold',
    gender: 'm',
    id: id,
    lastname: 'Rimmer',
    updated: ts,
  };

  test('PupilFactory() correctly returns a new pupil object', () => {
    const newPupilObj = PupilFactory(pupilObj, ts, classId);
    expect(JSON.stringify(newPupilObj)).toEqual(JSON.stringify(testPupil));
    expect(newPupilObj.created).toBe(newPupilObj.updated);
  });

  test('getPupilIdStr() returns the same string given the same object', () => {
    const idStrCompare = getPupilIdStr(pupilObj);
    expect(idStr).toEqual(idStrCompare);
  });
});

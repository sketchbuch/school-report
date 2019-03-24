// @flow

import pupilDefault, { PupilFactory, getPupilIdStr } from '../pupil';
import type { PupilType } from '../pupil';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../../constants/icons';
import { ROUTE_EDIT_BUILDER, ROUTE_DEL_PUPIL, ROUTE_EDIT_PUPIL } from '../../constants/routes';
import { generateId } from '../../utils/ids';

describe('Types: Pupil', () => {
  const pupilObj: PupilType = {
    ...pupilDefault,
    created: -1,
    description: 'Smeghead!',
    firstname: 'Arnold',
    gender: 'm',
    lastname: 'Rimmer',
    updated: -2,
  };
  const classId: string = 'c1';
  const ts: number = Date.now();
  const idStr: string = getPupilIdStr(pupilObj);
  const id: string = generateId(idStr, ts);
  const testPupil: PupilType = {
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
    const newPupilObj: PupilType = PupilFactory(pupilObj, ts, classId);
    expect(JSON.stringify(newPupilObj)).toEqual(JSON.stringify(testPupil));
    expect(newPupilObj.created).toBe(newPupilObj.updated);
  });

  test('getPupilIdStr() returns the same string given the same object', () => {
    const idStrCompare: string = getPupilIdStr(pupilObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newPupilObj: PupilType = PupilFactory(pupilObj, ts, classId);

    test('getDescription() correctly returns the description', () => {
      expect(newPupilObj.getDescription()).toEqual(newPupilObj.description);
    });

    test('getIcon() correctly returns the icon', () => {
      const femalePupilObj: PupilType = PupilFactory({ ...pupilObj, gender: 'f' }, ts, classId);
      expect(newPupilObj.getIcon()).toEqual(ICON_PUPILS_MALE);
      expect(femalePupilObj.getIcon()).toEqual(ICON_PUPILS_FEMALE);
    });

    test('getLabel() correctly returns the label', () => {
      expect(newPupilObj.getLabel()).toEqual(newPupilObj.firstname + ' ' + newPupilObj.lastname);
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newPupilObj.getTooltip()).toEqual(newPupilObj.getLabel() + ' - ' + newPupilObj.getDescription());
      newPupilObj.description = '';
      expect(newPupilObj.getTooltip()).toEqual(newPupilObj.getLabel());
    });

    describe('contains()', () => {
      test('Returns false if no search term', () => {
        const result: boolean = newPupilObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the pupil object does not begin with the search term.', () => {
        const term: string = 'Rimmer';
        const result: boolean = newPupilObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the pupil object begins with the search term.', () => {
        const term: string = 'Arn';
        const result: boolean = newPupilObj.contains(term);
        expect(result).toBe(true);
      });

      test('Returns true if the pupil object contains the search term.', () => {
        const term: string = 'Rimmer';
        const result: boolean = newPupilObj.contains(term, true);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_EDIT_BUILDER if linkType is builder', () => {
        expect(newPupilObj.getUrl('builder', 'r1')).toBe(
          ROUTE_EDIT_BUILDER.replace(':pupilId', newPupilObj.id)
            .replace(':classId', newPupilObj.classId)
            .replace(':reportId', 'r1')
        );
      });

      test('Returns ROUTE_DEL_PUPIL if linkType is delete', () => {
        expect(newPupilObj.getUrl('delete')).toBe(
          ROUTE_DEL_PUPIL.replace(':pupilId', newPupilObj.id).replace(':classId', newPupilObj.classId)
        );
      });

      test('Returns ROUTE_EDIT_PUPIL for any other linkType', () => {
        const expects: string = ROUTE_EDIT_PUPIL.replace(':pupilId', newPupilObj.id).replace(
          ':classId',
          newPupilObj.classId
        );
        expect(newPupilObj.getUrl()).toBe(expects);
        expect(newPupilObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

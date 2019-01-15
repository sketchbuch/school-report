// @flow

import pupilDefault, { PupilFactory, getPupilIdStr } from '../pupil';
import { ICON_PUPILS_FEMALE, ICON_PUPILS_MALE } from '../../constants/icons';
import { generateId } from '../../utils/ids';
import { ROUTE_EDIT_BUILDER, ROUTE_DEL_PUPIL, ROUTE_EDIT_PUPIL } from '../../constants/routes';

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

  describe('Getters:', () => {
    const newPupilObj = PupilFactory(pupilObj, ts, classId);

    test('getDescription() correctly returns the description', () => {
      expect(newPupilObj.getDescription()).toEqual(newPupilObj.description);
    });

    test('getIcon() correctly returns the icon', () => {
      const femalePupilObj = PupilFactory({ ...pupilObj, gender: 'f' }, ts, classId);
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
        const result = newPupilObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the pupil object does not contain the search term.', () => {
        const term = 'Lister';
        const result = newPupilObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the pupil object contains the search term.', () => {
        const term = 'Arn';
        const result = newPupilObj.contains(term);
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
        const expects = ROUTE_EDIT_PUPIL.replace(':pupilId', newPupilObj.id).replace(':classId', newPupilObj.classId);
        expect(newPupilObj.getUrl()).toBe(expects);
        expect(newPupilObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

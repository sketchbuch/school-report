// @flow

import classDefault, { ClassFactory, getClassIdStr } from '../class';
import type { ClassType } from '../class';
import { ICON_CLASSES } from '../../constants/icons';
import { ROUTE_DEL_CLASS, ROUTE_EDIT_CLASS, ROUTE_PUPILS } from '../../constants/routes';
import { generateId } from '../../utils/ids';

describe('Types: Class', () => {
  const classObj: ClassType = {
    ...classDefault,
    created: -1,
    label: 'Latimer Yr. 1',
    updated: -2,
  };
  const ts: number = Date.now();
  const idStr: string = getClassIdStr(classObj);
  const id: string = generateId(idStr, ts);
  const testClass: ClassType = {
    ...classDefault,
    created: ts,
    id: id,
    label: 'Latimer Yr. 1',
    updated: ts,
  };

  test('ClassFactory() correctly returns a new class object', () => {
    const newClassObj: ClassType = ClassFactory(classObj, ts);
    expect(JSON.stringify(newClassObj)).toEqual(JSON.stringify(testClass));
    expect(newClassObj.created).toBe(newClassObj.updated);
  });

  test('getClassIdStr() returns the same string given the same object', () => {
    const idStrCompare: string = getClassIdStr(classObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newClassObj: ClassType = ClassFactory(classObj, ts);

    test('getDescription() correctly returns the description', () => {
      expect(newClassObj.getDescription()).toEqual('(' + newClassObj.pupilCount + ')');
    });

    test('getIcon() correctly returns the icon', () => {
      expect(newClassObj.getIcon()).toEqual(ICON_CLASSES);
    });

    test('getLabel() correctly returns the label', () => {
      expect(newClassObj.getLabel()).toEqual(newClassObj.label);
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newClassObj.getTooltip()).toEqual(newClassObj.getLabel() + ' - ' + newClassObj.getDescription());
    });

    describe('contains()', () => {
      test('Returns false if no search term', () => {
        const result: boolean = newClassObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the class object does not contain the search term.', () => {
        const term: string = 'Pendley';
        const result: boolean = newClassObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the class object contains the search term.', () => {
        const term: string = 'Yr.';
        const result: boolean = newClassObj.contains(term);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_EDIT_CLASS if linkType is edit', () => {
        expect(newClassObj.getUrl('edit')).toBe(ROUTE_EDIT_CLASS.replace(':classId', newClassObj.id));
      });

      test('Returns ROUTE_DEL_CLASS if linkType is delete', () => {
        expect(newClassObj.getUrl('delete')).toBe(ROUTE_DEL_CLASS.replace(':classId', newClassObj.id));
      });

      test('Returns ROUTE_PUPILS for any other linkType', () => {
        const expects: string = ROUTE_PUPILS.replace(':classId', newClassObj.id);
        expect(newClassObj.getUrl()).toBe(expects);
        expect(newClassObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

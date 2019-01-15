// @flow

import classDefault, { ClassFactory, getClassIdStr } from '../class';
import { ICON_CLASSES } from '../../constants/icons';
import { generateId } from '../../utils/ids';
import { ROUTE_DEL_CLASS, ROUTE_EDIT_CLASS, ROUTE_PUPILS } from '../../constants/routes';

describe('Types: Class', () => {
  const classObj = {
    ...classDefault,
    created: -1,
    label: 'Latimer Yr. 1',
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getClassIdStr(classObj);
  const id = generateId(idStr, ts);
  const testClass = {
    ...classDefault,
    created: ts,
    id: id,
    label: 'Latimer Yr. 1',
    updated: ts,
  };

  test('ClassFactory() correctly returns a new class object', () => {
    const newClassObj = ClassFactory(classObj, ts);
    expect(JSON.stringify(newClassObj)).toEqual(JSON.stringify(testClass));
    expect(newClassObj.created).toBe(newClassObj.updated);
  });

  test('getClassIdStr() returns the same string given the same object', () => {
    const idStrCompare = getClassIdStr(classObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newClassObj = ClassFactory(classObj, ts);

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
        const result = newClassObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the class object does not contain the search term.', () => {
        const term = 'Pendley';
        const result = newClassObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the class object contains the search term.', () => {
        const term = 'Yr.';
        const result = newClassObj.contains(term);
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
        const expects = ROUTE_PUPILS.replace(':classId', newClassObj.id);
        expect(newClassObj.getUrl()).toBe(expects);
        expect(newClassObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

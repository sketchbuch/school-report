// @flow

import reportDefault, { ReportFactory, getReportIdStr } from '../report';
import { ICON_REPORTS } from '../../constants/icons';
import { generateId } from '../../utils/ids';
import {
  ROUTE_BUILDER,
  ROUTE_DEL_REPORT,
  ROUTE_EDIT_REPORT,
} from '../../constants/routes';

describe('Types: Report', () => {
  const reportObj = {
    ...reportDefault,
    created: -1,
    classes: ['c1', 'c2'],
    label: 'Report 1',
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getReportIdStr(reportObj);
  const id = generateId(idStr, ts);
  const testClass = {
    ...reportDefault,
    created: ts,
    classes: ['c1', 'c2'],
    id: id,
    label: 'Report 1',
    updated: ts,
  };

  test('ReportFactory() correctly returns a new category object', () => {
    const newReportObj = ReportFactory(reportObj, ts);
    expect(JSON.stringify(newReportObj)).toEqual(JSON.stringify(testClass));
    expect(newReportObj.created).toBe(newReportObj.updated);
  });

  test('getReportIdStr() returns the same string given the same object', () => {
    const idStrCompare = getReportIdStr(reportObj);
    expect(idStr).toEqual(idStrCompare);
  });

  describe('Getters:', () => {
    const newReportObj = ReportFactory(reportObj, ts);

    test('getDescription() correctly returns the description', () => {
      expect(newReportObj.getDescription()).toEqual(
        `(${reportObj.classes.length})`
      );
    });

    test('getIcon() correctly returns the icon', () => {
      expect(newReportObj.getIcon()).toEqual(ICON_REPORTS);
    });

    test('getLabel() correctly returns the label', () => {
      expect(newReportObj.getLabel()).toEqual(newReportObj.label);
    });

    test('getTooltip() correctly returns the tooltip', () => {
      expect(newReportObj.getTooltip()).toEqual(
        `${newReportObj.label} - (${reportObj.classes.length})`
      );
    });

    describe('contains()', () => {
      test('Returns false if no search term', () => {
        const result = newReportObj.contains();
        expect(result).toBe(false);
      });

      test('Returns false if the report object does not contain the search term.', () => {
        const term = 'text';
        const result = newReportObj.contains(term);
        expect(result).toBe(false);
      });

      test('Returns true if the report object contains the search term.', () => {
        const term = 'port';
        const result = newReportObj.contains(term);
        expect(result).toBe(true);
      });
    });

    describe('getUrl()', () => {
      test('Returns ROUTE_EDIT_REPORT if linkType is edit', () => {
        expect(newReportObj.getUrl('edit')).toBe(
          ROUTE_EDIT_REPORT.replace(':reportId', newReportObj.id)
        );
      });

      test('Returns ROUTE_DEL_REPORT if linkType is delete', () => {
        expect(newReportObj.getUrl('delete')).toBe(
          ROUTE_DEL_REPORT.replace(':reportId', newReportObj.id)
        );
      });

      test('Returns ROUTE_BUILDER for any other linkType', () => {
        const expects = ROUTE_BUILDER.replace(':reportId', newReportObj.id);
        expect(newReportObj.getUrl()).toBe(expects);
        expect(newReportObj.getUrl('something')).toBe(expects);
      });
    });
  });
});

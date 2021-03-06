// @flow

import { getPupilTextHtml } from '../html';
import type { PupilType } from '../../types/pupil';
import type { InsertDangerousHtmlObj } from '../../types/misc';
import pupilDefault, { PupilFactory } from '../../types/pupil';

describe('Util: HTML', () => {
  const testPupil: PupilType = PupilFactory(
    { ...pupilDefault, firstname: 'John', lastname: 'Smith' },
    Date.now(),
    'c1'
  );

  test('getPupilTextHtml() should should replace #N#', () => {
    const testText: string = 'This is a c placeholder #N# test';
    const testObj: InsertDangerousHtmlObj = getPupilTextHtml(testText, testPupil);
    const modifiedText: string = testText.replace(
      new RegExp('#N#', 'g'),
      '<strong>' + testPupil.getLabel() + '</strong>'
    );

    expect(testObj.__html).toBe(modifiedText);
  });

  test('getPupilTextHtml() should should replace #F#', () => {
    const testText: string = 'This is a #F# placeholder #F# test';
    const testObj: InsertDangerousHtmlObj = getPupilTextHtml(testText, testPupil);
    const modifiedText: string = testText.replace(
      new RegExp('#F#', 'g'),
      '<strong>' + testPupil.firstname + '</strong>'
    );

    expect(testObj.__html).toBe(modifiedText);
  });

  test('getPupilTextHtml() should should replace #L#', () => {
    const testText: string = 'This is a #L# placeholder #L# test';
    const testObj: InsertDangerousHtmlObj = getPupilTextHtml(testText, testPupil);
    const modifiedText: string = testText.replace(
      new RegExp('#L#', 'g'),
      '<strong>' + testPupil.lastname + '</strong>'
    );

    expect(testObj.__html).toBe(modifiedText);
  });
});

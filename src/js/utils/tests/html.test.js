// @flow

import { getPupilTextHtml } from '../html';
import pupilDefault, { PupilFactory } from '../../types/pupil';

/**
 * ID Tests
 */

describe('Util: HTML', () => {
  const testPupil = PupilFactory({ ...pupilDefault, firstname: 'John', lastname: 'Smith' }, Date.now(), 'c1');

  test('getPupilTextHtml() should should replace #N#', () => {
    const testText = 'This is a c placeholder #N# test';
    const testObj = getPupilTextHtml(testText, testPupil);
    const modifiedText = testText.replace(new RegExp('#N#', 'g'), '<strong>' + testPupil.getLabel() + '</strong>');

    expect(testObj.__html).toBe(modifiedText);
  });

  test('getPupilTextHtml() should should replace #F#', () => {
    const testText = 'This is a #F# placeholder #F# test';
    const testObj = getPupilTextHtml(testText, testPupil);
    const modifiedText = testText.replace(new RegExp('#F#', 'g'), '<strong>' + testPupil.firstname + '</strong>');

    expect(testObj.__html).toBe(modifiedText);
  });

  test('getPupilTextHtml() should should replace #L#', () => {
    const testText = 'This is a #L# placeholder #L# test';
    const testObj = getPupilTextHtml(testText, testPupil);
    const modifiedText = testText.replace(new RegExp('#L#', 'g'), '<strong>' + testPupil.lastname + '</strong>');

    expect(testObj.__html).toBe(modifiedText);
  });
});

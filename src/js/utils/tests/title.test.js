// @flow

import setTitle, { titleSep } from '../title';
import '../../components/Translation/testData';


/**
* ID Tests
*/

describe('Util: Titles', () => {
  test('setTitle() should set the default title if no prefix provided', () => {
    setTitle();
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name);
  });

  test('setTitle() handles suffix correctly', () => {
    setTitle('Test');
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name + titleSep + 'Test');
    setTitle(' ');
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name);
  });
});

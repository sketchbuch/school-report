// @flow

import setTitle, { titleSep } from '../setTitle';

describe('Util: setTitle()', () => {
  test('Should set the default title if no prefix provided', () => {
    setTitle();
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name);
  });

  test('Handles suffix correctly', () => {
    setTitle('Test');
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name + titleSep + 'Test');
    setTitle(' ');
    expect(window.document.title).toBe(window.reportr.translations.EN.App.Name);
  });
});

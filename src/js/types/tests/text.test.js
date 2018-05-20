// @flow

import textDefault, { TextFactory, getTextIdStr } from '../text';
import { generateId } from '../../utils/ids';

describe('Types: Text', () => {
  const langCode = 'EN';
  const textObj = {
    ...textDefault,
    bodytext: 'A text',
    created: -1,
    updated: -2,
  };
  const ts = Date.now();
  const idStr = getTextIdStr(textObj);
  const id = generateId(idStr, ts);
  const testText = {
    ...textDefault,
    bodytext: 'A text',
    created: ts,
    id: id,
    lang: langCode,
    updated: ts,
  };

  test('TextFactory() correctly returns a new pupil object', () => {
    const newTextObj = TextFactory(textObj, ts, langCode);
    expect(JSON.stringify(newTextObj)).toEqual(JSON.stringify(testText));
    expect(newTextObj.created).toBe(newTextObj.updated);
  });

  test('getTextIdStr() returns the same string given the same object', () => {
    const idStrCompare = getTextIdStr(textObj);
    expect(idStr).toEqual(idStrCompare);
  });
});

// @flow

import JSZip from 'jszip';
import Docxtemplater from 'docxtemplater';
import {
  exportWord,
  getContent,
  getDateFromTs,
} from '../export';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import textDefault, { TextFactory } from '../../types/text';
import type { PupilType } from '../../types/pupil';
import { text } from '../../components/Translation/Translation';
import '../../components/Translation/testData';

jest.mock('jszip', () => jest.fn(()=>{}));

jest.mock('docxtemplater', () => {
  return {
    getZip: jest.fn(()=>{}),
    loadZip: jest.fn(()=>{}),
    render: jest.fn(()=>{}),
    setData: jest.fn(()=>{})
  }
});


/**
* FS Export Tests
*/

describe('FS: Export:', () => {
  const dummyTexts = [
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
    TextFactory({...textDefault, bodytext: "A text" }, Date.now(), 'EN'),
  ];

  const items = [
    {
      classRec: ClassFactory({...classDefault, label: 'Dave Lister' }, Date.now()),
      id: '',
      pupils: [],
      reportId: 'r1',
    },
    {
      classRec: ClassFactory({...classDefault, label: 'Arnold Rimmer' }, Date.now()),
      id: '',
      pupils: [],
      reportId: 'r1',
    },
    {
      classRec: ClassFactory({...classDefault, label: 'The Cat' }, Date.now()),
      id: '',
      pupils: [],
      reportId: 'r1',
    },
  ];

  items.forEach(item => {
    item.id = item.classRec.id;
  });

  items[1].pupils.push(PupilFactory({...pupilDefault, firstname: 'John', lastname: 'Smith'}, Date.now(), items[1].id));
  items[1].pupils.push(PupilFactory({...pupilDefault, firstname: 'Sarah', lastname: 'Smith'}, Date.now(), items[1].id));
  items[1].pupils.push(PupilFactory({...pupilDefault, firstname: 'Robert', lastname: 'Fletcher'}, Date.now(), items[1].id));
  items[2].pupils.push(PupilFactory({...pupilDefault, firstname: 'John', lastname: 'Roberts'}, Date.now(), items[2].id));

  const dummyBuilderData = {};
  items.forEach(item => {
    dummyBuilderData[item.id] = {};

    item.pupils.forEach((pupil) => {
      dummyBuilderData[item.id][pupil.id] = [];
    });
  });

  dummyBuilderData[items[1].id][items[1].pupils[0].id] = [ dummyTexts[0].id, dummyTexts[1].id, dummyTexts[3].id, dummyTexts[5].id ];
  dummyBuilderData[items[1].id][items[1].pupils[1].id] = [ dummyTexts[7].id, dummyTexts[5].id ];
  dummyBuilderData[items[1].id][items[1].pupils[2].id] = [ dummyTexts[5].id, dummyTexts[6].id, dummyTexts[7].id ];
  dummyBuilderData[items[2].id][items[1].pupils[0].id] = [ dummyTexts[2].id, dummyTexts[7].id, dummyTexts[3].id, dummyTexts[1].id, dummyTexts[2].id ];

  const defaultContent = {
    classCount: 0,
    content: [],
    pupilCount: 0,
  };
  
  test('getDateFromTs() should return a formatted date string', () => {
    const ts = Date.now();
    const result = getDateFromTs(ts);
    const EXPECTED_FORMAT = text('DateFormat', 'Lang', {
      D: '04',
      M: '09',
      Y: '2018',
    });
    expect(getDateFromTs(ts)).toBe(result); // Test that both calls return the same
    expect(getDateFromTs(1536092102000)).toBe(EXPECTED_FORMAT); // Fixed test
  });
  
  describe('getContent():', () => {
    test('Returns a default content object if builderData is undefined', () => {
      expect(getContent(items, {}, dummyTexts)).toEqual(defaultContent);
    });

    test('Returns the correct content', () => {
      const result = getContent(items, dummyBuilderData, dummyTexts);
      const expectedClassCount = items.filter((item) => item.pupils.length > 0).length;
      const expectedPupilCount = items.reduce((accumulator, currentValue) => accumulator + currentValue.pupils.length, 0);

      expect(result.classCount).not.toBe(items.length);
      expect(result.classCount).toBe(expectedClassCount);
      expect(result.pupilCount).toBe(expectedPupilCount);
    });
  });
  
  describe.skip('exportWord():', () => {
    test('Returns a default content object if builderData is undefined', () => {
      const content = getContent(items, dummyBuilderData, dummyTexts);
      
      expect(exportWord({
        name: "the-filename",
        classCount: content.classCount,
        content: content.content,
        exported: getDateFromTs(Date.now()),
        pupilCount: content.pupilCount,
        reportName: 'Report 1',
      }, jest.fn())).toThrow();
    });
  });
});

// @flow

import {
  getActiveCategory,
  getActiveClass,
  getActivePupil,
  getActiveReport,
  getActiveText,
} from '../redux';
import type CategoryType from '../../types/category';
import type ClassType from '../../types/class';
import type PupilType from '../../types/pupil';
import type ReportType from '../../types/report';
import type TextType from '../../types/text';
import categoryDefault, { CategoryFactory } from '../../types/category';
import classDefault, { ClassFactory } from '../../types/class';
import pupilDefault, { PupilFactory } from '../../types/pupil';
import reportDefault, { ReportFactory } from '../../types/report';
import textDefault, { TextFactory } from '../../types/text';



/**
* Redux Tests
*/

describe('Util: Redux', () => {
  test('getActiveCategory() returns the correct category', () => {
    const categories = [
      CategoryFactory({...categoryDefault, label: 'Category 1' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'Category 2' }, Date.now()),
      CategoryFactory({...categoryDefault, label: 'Category 3' }, Date.now()),
    ];

    expect(getActiveCategory(categories, categories[1].id)).toEqual(categories[1]);
  });

  test('getActiveClass() returns the correct class', () => {
    const classes = [
      ClassFactory({...classDefault, label: 'Class 1' }, Date.now()),
      ClassFactory({...classDefault, label: 'Class 2' }, Date.now()),
      ClassFactory({...classDefault, label: 'Class 3' }, Date.now()),
    ];
    
    expect(getActiveClass(classes, classes[1].id)).toEqual(classes[1]);
  });

  test('getActivePupil() returns the correct pupil', () => {
    const pupils = [
      PupilFactory({...pupilDefault, firstname: 'Dave', lastname: 'Lister' }, Date.now(), 'c1'),
      PupilFactory({...pupilDefault, firstname: 'Arnold', lastname: 'Rimmer' }, Date.now(), 'c1'),
      PupilFactory({...pupilDefault, firstname: 'The', lastname: 'Cat' }, Date.now(), 'c1'),
    ];
    
    expect(getActivePupil(pupils, pupils[1].id)).toEqual(pupils[1]);
  });

  test('getActiveReport() returns the correct report', () => {
    const reports = [
      ReportFactory({...reportDefault, label: 'Report 1' }, Date.now()),
      ReportFactory({...reportDefault, label: 'Report 2' }, Date.now()),
      ReportFactory({...reportDefault, label: 'Report 3' }, Date.now()),
    ];
    
    expect(getActiveReport(reports, reports[1].id)).toEqual(reports[1]);
  });

  test('getActiveText() returns the correct text', () => {
    const texts = [
      TextFactory({...textDefault, bodytext: 'Text 1' }, Date.now(), 'EN'),
      TextFactory({...textDefault, bodytext: 'Text 2' }, Date.now(), 'EN'),
      TextFactory({...textDefault, bodytext: 'Text 3' }, Date.now(), 'EN'),
    ];
    
    expect(getActiveText(texts, texts[1].id)).toEqual(texts[1]);
  });
});

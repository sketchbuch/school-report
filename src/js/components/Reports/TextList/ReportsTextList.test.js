// @flow

import React from 'react';
import { shallow } from 'enzyme';
import categoryDefault from '../../../types/category';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import textDefault, { TextFactory } from '../../../types/text';
import ReportsTextList from './ReportsTextList';

describe('<ReportsTextList />', () => {
  const props = {
    activePupil: PupilFactory({ ...pupilDefault, firstname: 'Dr', lastname: 'Who' }, Date.now(), 'cl1'),
    categories: [
      { ...categoryDefault, label: 'Lister', id: 'c1' },
      { ...categoryDefault, label: 'Rimmer', id: 'c2' },
      { ...categoryDefault, label: 'The Cat', id: 'c3' },
    ],
    handleTextToggle: jest.fn(),
    selectedTexts: [],
    texts: [
      TextFactory({ ...textDefault, bodytext: 'Red Dwarf', categories: ['c1'] }, Date.now(), 'EN'),
      TextFactory({ ...textDefault, bodytext: 'Blue Midget', categories: [] }, Date.now(), 'EN'),
      TextFactory({ ...textDefault, bodytext: 'Starbug', categories: ['c1', 'c2'] }, Date.now(), 'EN'),
    ],
  };

  props.selectedTexts.push(props.texts[0].id);
  props.selectedTexts.push(props.texts[1].id);

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsTextList {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('No visibleTexts renders NoItems', () => {
    const wrapper = shallow(<ReportsTextList {...props} texts={[]} />);
    expect(wrapper.find('NoItems')).toHaveLength(1);
  });

  describe('getVisibleTexts()', () => {
    const wrapper = shallow(<ReportsTextList {...props} />);

    test('"category-all" returns all texts', () => {
      expect(wrapper.instance().getVisibleTexts()).toEqual(props.texts);
    });

    test('"category-nocat" returns all texts without a category', () => {
      wrapper.instance().onFilterChanage({ target: { value: 'category-nocat' } });
      expect(wrapper.instance().getVisibleTexts()).toEqual(props.texts.slice(1, 2));
    });

    test('"category-selected" returns all selected texts', () => {
      wrapper.instance().onFilterChanage({ target: { value: 'category-selected' } });
      expect(wrapper.instance().getVisibleTexts()).toEqual(props.texts.slice(0, 2));
    });

    test('"category-unselected" returns all unselected texts', () => {
      wrapper.instance().onFilterChanage({ target: { value: 'category-unselected' } });
      expect(wrapper.instance().getVisibleTexts()).toEqual(props.texts.slice(2));
    });

    test('A cat ID returns all texts in the category', () => {
      const expectedResult = [];
      expectedResult.push(props.texts[0]);
      expectedResult.push(props.texts[2]);
      wrapper.instance().onFilterChanage({ target: { value: 'c1' } });
      expect(wrapper.instance().getVisibleTexts()).toEqual(expectedResult);
    });
  });
});

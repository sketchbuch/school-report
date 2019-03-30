// @flow

import React from 'react';
import { shallow } from 'enzyme';
import categoryDefault from '../../../types/category';
import pupilDefault, { PupilFactory } from '../../../types/pupil';
import textDefault, { TextFactory } from '../../../types/text';
import ReportsAvailableTexts from './ReportsAvailableTexts';
import type { Props } from './ReportsAvailableTexts';

describe('<ReportsAvailableTexts />', () => {
  const props: Props = {
    activePupil: PupilFactory({ ...pupilDefault, firstname: 'Dr', lastname: 'Who' }, Date.now(), 'cl1'),
    categories: [
      { ...categoryDefault, label: 'Lister', id: 'c1' },
      { ...categoryDefault, label: 'Rimmer', id: 'c2' },
      { ...categoryDefault, label: 'The Cat', id: 'c3' },
    ],
    categoryId: '',
    categoryLabel: '',
    disableTexts: false,
    handleTextToggle: jest.fn(),
    searchProps: {
      anywhere: false,
      anywhereIconClick: jest.fn(),
      page: 1,
      pageChange: jest.fn(),
      searchChange: jest.fn(),
      searchIconClick: jest.fn(),
      term: '',
      visible: false,
    },
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
    const wrapper = shallow(<ReportsAvailableTexts {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('No visibleTexts renders NoItems', () => {
    const wrapper = shallow(<ReportsAvailableTexts {...props} texts={[]} />);
    expect(wrapper.find('NoItems')).toHaveLength(1);
  });
});

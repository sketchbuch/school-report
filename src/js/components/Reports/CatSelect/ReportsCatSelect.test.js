// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ReportsCatSelect from './ReportsCatSelect';
import categoryDefault from '../../../types/category';
import textDefault from '../../../types/text';

describe('<ReportsCatSelect />', () => {
  const props = {
    categories: [
      { ...categoryDefault, id: 'c1', label: 'Justice' },
      { ...categoryDefault, id: 'c2', label: 'Holoship' },
    ],
    texts: [
      { ...textDefault, id: 't1', bodytext: 'Red Dwarf' },
      { ...textDefault, id: 't2', bodytext: 'Blue Midget' },
      { ...textDefault, id: 't3', bodytext: 'Starbug' },
    ],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ReportsCatSelect />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders nothing if no categories', () => {
    const content = '.ReportsCatSelect';
    const wrapper1 = shallow(<ReportsCatSelect />);
    const wrapper2 = shallow(<ReportsCatSelect {...props} />);

    expect(wrapper1.find(content)).toHaveLength(0);
    expect(wrapper2.find(content)).toHaveLength(1);
  });

  test('Shows the selected option when needed', () => {
    const option = 'option[value="category-selected"]';
    const wrapper1 = shallow(<ReportsCatSelect {...props} />);
    const wrapper2 = shallow(<ReportsCatSelect {...props} selectedCount={3} />);

    expect(wrapper1.find(option)).toHaveLength(0);
    expect(wrapper2.find(option)).toHaveLength(1);
  });

  test('Shows the unselected option when needed', () => {
    const option = 'option[value="category-unselected"]';
    const wrapper1 = shallow(<ReportsCatSelect {...props} />);
    const wrapper2 = shallow(<ReportsCatSelect {...props} selectedCount={props.texts.length} />);

    expect(wrapper1.find(option)).toHaveLength(1);
    expect(wrapper2.find(option)).toHaveLength(0);
  });

  test('Shows the uncategorised option when needed', () => {
    const props2 = {
      categories: [
        { ...categoryDefault, id: 'c1', label: 'Justice' },
        { ...categoryDefault, id: 'c2', label: 'Holoship' },
      ],
      texts: [
        { ...textDefault, id: 't1', bodytext: 'Red Dwarf', categories: ['c1'] },
        {
          ...textDefault,
          id: 't2',
          bodytext: 'Blue Midget',
          categories: ['c1'],
        },
        {
          ...textDefault,
          id: 't3',
          bodytext: 'Starbug',
          categories: ['c1', 'c2'],
        },
      ],
    };

    const option = 'option[value="category-nocat"]';
    const wrapper1 = shallow(<ReportsCatSelect {...props} />);
    const wrapper2 = shallow(<ReportsCatSelect {...props2} />);

    expect(wrapper1.find(option)).toHaveLength(1);
    expect(wrapper2.find(option)).toHaveLength(0);
  });
});

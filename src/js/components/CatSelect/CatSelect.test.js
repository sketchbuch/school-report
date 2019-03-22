// @flow

import React from 'react';
import { shallow } from 'enzyme';
import CatSelect from './CatSelect';
import type { Props } from './CatSelect';
import categoryDefault from '../../types/category';
import textDefault from '../../types/text';

describe('<CatSelect />', () => {
  const props: Props = {
    categories: [
      { ...categoryDefault, id: 'c1', label: 'Justice' },
      { ...categoryDefault, id: 'c2', label: 'Holoship' },
    ],
    option: '',
    onChange: jest.fn,
    texts: [
      { ...textDefault, id: 't1', bodytext: 'Red Dwarf' },
      { ...textDefault, id: 't2', bodytext: 'Blue Midget' },
      { ...textDefault, id: 't3', bodytext: 'Starbug' },
    ],
    selectedCount: 0,
    useSelected: false,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<CatSelect />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders nothing if no categories', () => {
    const content = '.CatSelect';
    const wrapper1 = shallow(<CatSelect />);
    const wrapper2 = shallow(<CatSelect {...props} />);

    expect(wrapper1.find(content)).toHaveLength(0);
    expect(wrapper2.find(content)).toHaveLength(1);
  });

  test('Shows the selected option when needed', () => {
    const option = 'option[value="category-selected"]';
    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props} selectedCount={3} />);

    expect(wrapper1.find(option)).toHaveLength(0);
    expect(wrapper2.find(option)).toHaveLength(1);
  });

  test('Shows the unselected option when needed', () => {
    const option = 'option[value="category-unselected"]';
    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props} selectedCount={props.texts.length} />);

    expect(wrapper1.find(option)).toHaveLength(1);
    expect(wrapper2.find(option)).toHaveLength(0);
  });

  test('Shows the uncategorised option when needed', () => {
    const props2: Props = {
      ...props,
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

    const option: string = 'option[value="category-nocat"]';
    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props2} />);

    expect(wrapper1.find(option)).toHaveLength(1);
    expect(wrapper2.find(option)).toHaveLength(0);
  });
});

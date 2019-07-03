// @flow

import React from 'react';
import { shallow } from 'enzyme';
import CatSelect from './CatSelect';
import categoryDefault from '../../types/category';
import textDefault from '../../types/text';
import type { Props } from './CatSelect';
import type { SelectOption } from '../../types/ui';

describe('<CatSelect />', () => {
  const props: Props = {
    categories: [
      { ...categoryDefault, id: 'c1', label: 'Justice' },
      { ...categoryDefault, id: 'c2', label: 'Holoship' },
    ],
    option: '',
    onChange: jest.fn(),
    texts: [
      { ...textDefault, id: 't1', bodytext: 'Red Dwarf' },
      { ...textDefault, id: 't2', bodytext: 'Blue Midget' },
      { ...textDefault, id: 't3', bodytext: 'Starbug' },
    ],
    selectedCount: 0,
    useSelected: true,
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<CatSelect {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders nothing if no categories', () => {
    const content = '.CatSelect';
    const wrapper1 = shallow(<CatSelect {...props} categories={[]} />);
    const wrapper2 = shallow(<CatSelect {...props} />);

    expect(wrapper1.find(content)).toHaveLength(0);
    expect(wrapper2.find(content)).toHaveLength(1);
  });

  test('Shows the selected option if useSelected and selectedCount > 0', () => {
    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props} selectedCount={3} />);
    const options1 = wrapper1.find('Select').prop('options');
    const options2 = wrapper2.find('Select').prop('options');

    expect(options1.find((item: SelectOption) => item.value === 'category-selected')).toBeUndefined();
    expect(options2.find((item: SelectOption) => item.value === 'category-selected')).not.toBeUndefined();
  });

  test('Shows the unselected option if useSelected and unselectedCount > 0', () => {
    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props} selectedCount={props.texts.length} />);
    const options1 = wrapper1.find('Select').prop('options');
    const options2 = wrapper2.find('Select').prop('options');

    expect(options1.find((item: SelectOption) => item.value === 'category-unselected')).not.toBeUndefined();
    expect(options2.find((item: SelectOption) => item.value === 'category-unselected')).toBeUndefined();
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

    const wrapper1 = shallow(<CatSelect {...props} />);
    const wrapper2 = shallow(<CatSelect {...props2} />);
    const options1 = wrapper1.find('Select').prop('options');
    const options2 = wrapper2.find('Select').prop('options');

    expect(options1.find((item: SelectOption) => item.value === 'category-nocat')).not.toBeUndefined();
    expect(options2.find((item: SelectOption) => item.value === 'category-nocat')).toBeUndefined();
  });
});

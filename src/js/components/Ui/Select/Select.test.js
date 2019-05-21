//@flow

import React from 'react';
import { shallow } from 'enzyme';
import Select from './Select';
import type { Props } from './Select';

describe('<Select />', () => {
  const props: Props = {
    className: '',
    disabled: false,
    isValid: false,
    onChange: jest.fn(),
    options: [
      {
        disabled: false,
        label: 'Elphaba',
        value: 'elphaba',
      },
      {
        disabled: false,
        label: 'Scarecrow',
        value: 'scarecrow',
      },
      {
        disabled: false,
        label: 'Cowadly Lion',
        value: 'lion',
      },
    ],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders a Select component', () => {
    const wrapper = shallow(<Select {...props} />);
    expect(wrapper.find('Select')).toHaveLength(1);
  });

  test('Renders the correct number of opions', () => {
    const wrapper = shallow(<Select {...props} />);
    const select = wrapper.find('Select');
    expect(select.prop('options')).toHaveLength(props.options.length);
  });
});

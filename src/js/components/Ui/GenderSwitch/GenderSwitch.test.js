//@flow

import React from 'react';
import { shallow } from 'enzyme';
import GenderSwitch from './GenderSwitch';
import type { Props } from './GenderSwitch';

describe('<GenderSwitch />', () => {
  const props: Props = {
    large: false,
    name: 'gender',
    onBlur: jest.fn(),
    onChange: jest.fn(),
    titleFemale: 'Female',
    titleMale: 'Male',
    value: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<GenderSwitch {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles large property correctly', () => {
    const wrapper1 = shallow(<GenderSwitch {...props} large />);
    const wrapper2 = shallow(<GenderSwitch {...props} />);

    expect(wrapper1.find('.GenderSwitch').hasClass('GenderSwitch--large')).toEqual(true);
    expect(wrapper2.find('.GenderSwitch').hasClass('GenderSwitch--large')).toEqual(false);
  });

  test('Checks the correct input', () => {
    let wrapper = shallow(<GenderSwitch {...props} value="m" />);
    let checkboxM = wrapper.find('input[value="m"]');
    let checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(true);
    expect(checkboxF.props().checked).toEqual(false);

    wrapper = shallow(<GenderSwitch {...props} value="f" />);
    checkboxM = wrapper.find('input[value="m"]');
    checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(false);
    expect(checkboxF.props().checked).toEqual(true);

    wrapper = shallow(<GenderSwitch {...props} value="wrong" />);
    checkboxM = wrapper.find('input[value="m"]');
    checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(false);
    expect(checkboxF.props().checked).toEqual(false);
  });
});

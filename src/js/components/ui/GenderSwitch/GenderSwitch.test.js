import React from 'react';
import { shallow } from 'enzyme';
import GenderSwitch from './GenderSwitch';

describe('<GenderSwitch />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<GenderSwitch />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles large property correctly', () => {
    const props1 = { large: true };
    const wrapper1 = shallow(<GenderSwitch {...props1} />);
    const props2 = {};
    const wrapper2 = shallow(<GenderSwitch {...props2} />);

    expect(wrapper1.find('.GenderSwitch').hasClass('GenderSwitch--large')).toEqual(true);
    expect(wrapper2.find('.GenderSwitch').hasClass('GenderSwitch--large')).toEqual(false);
  });

  test('Checks the correct input', () => {
    let props = { value: 'm' };
    let wrapper = shallow(<GenderSwitch {...props} />);
    let checkboxM = wrapper.find('input[value="m"]');
    let checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(true);
    expect(checkboxF.props().checked).toEqual(false);

    props = { value: 'f' };
    wrapper = shallow(<GenderSwitch {...props} />);
    checkboxM = wrapper.find('input[value="m"]');
    checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(false);
    expect(checkboxF.props().checked).toEqual(true);

    props = { value: 'wrong' };
    wrapper = shallow(<GenderSwitch />);
    checkboxM = wrapper.find('input[value="m"]');
    checkboxF = wrapper.find('input[value="f"]');

    expect(checkboxM.props().checked).toEqual(false);
    expect(checkboxF.props().checked).toEqual(false);
  });
});

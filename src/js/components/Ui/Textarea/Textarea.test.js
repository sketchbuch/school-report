//@flow

import React from 'react';
import { shallow } from 'enzyme';
import Textarea from './Textarea';
import type { Props } from './Textarea';

describe('<Textarea />', () => {
  const props: Props = {
    className: '',
    disabled: false,
    isValid: true,
    name: '',
    onBlur: jest.fn(),
    onChange: jest.fn(),
    placeholder: '',
    title: '',
    value: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Textarea {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles disabled property', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<Textarea {...props} disabled onChange={mockOnChange} />);
    wrapper.simulate('change');
    expect(mockOnChange.mock.calls.length).toBe(0);
  });

  test('Handles className property', () => {
    const CLASS_NAME = 'TestClass';
    const cn1Wrapper = shallow(<Textarea {...props} />);
    const cn2Wrapper = shallow(<Textarea {...props} className={CLASS_NAME} />);

    expect(cn1Wrapper.find('textarea').hasClass(CLASS_NAME)).toEqual(false);
    expect(cn2Wrapper.find('textarea').hasClass(CLASS_NAME)).toEqual(true);
  });

  test('Handles isValid property', () => {
    const wrapper1 = shallow(<Textarea {...props} />);
    const wrapper2 = shallow(<Textarea {...props} isValid={false} />);

    expect(wrapper1.find('textarea').hasClass('has--error')).toEqual(false);
    expect(wrapper2.find('textarea').hasClass('has--error')).toEqual(true);
  });
});

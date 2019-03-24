//@flow

import React from 'react';
import { shallow } from 'enzyme';
import TextInput from './TextInput';
import type { Props } from './TextInput';
import { UI_ERROR_CLASS } from '../../../constants/ui';

describe('<TextInput />', () => {
  const props: Props = {
    className: '',
    disabled: false,
    isValid: true,
    maxLength: 20,
    name: 'test',
    onBlur: jest.fn(),
    onChange: jest.fn(),
    onKeyUp: jest.fn(),
    placeholder: 'Enter text...',
    title: 'An input',
    type: 'text',
    value: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<TextInput {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles disabled property', () => {
    const mockOnChange = jest.fn();
    const wrapper = shallow(<TextInput {...props} disabled onChange={mockOnChange} />);
    wrapper.simulate('shallow');
    expect(mockOnChange.mock.calls.length).toBe(0);
  });

  test('Handles className property', () => {
    const CLASS_NAME = 'TestClass';
    const cn1Wrapper = shallow(<TextInput {...props} />);
    const cn2Wrapper = shallow(<TextInput {...props} className={CLASS_NAME} />);

    expect(cn1Wrapper.find('.TextInput').hasClass(CLASS_NAME)).toEqual(false);
    expect(cn2Wrapper.find('.TextInput').hasClass(CLASS_NAME)).toEqual(true);
  });

  test('Handles isValid property', () => {
    const iv1Wrapper = shallow(<TextInput {...props} />);
    const iv2Wrapper = shallow(<TextInput {...props} isValid={false} />);

    expect(iv1Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(false);
    expect(iv2Wrapper.find('.TextInput').hasClass(UI_ERROR_CLASS)).toEqual(true);
  });
});

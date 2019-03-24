//@flow

import React from 'react';
import { shallow } from 'enzyme';
import Button from './Button';
import type { Props } from './Button';

describe('<Button />', () => {
  const props: Props = {
    busy: false,
    className: '',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Button {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles busy property', () => {
    const wrapper = shallow(<Button {...props} busy />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });

  test('Handles className property', () => {
    const CLASS_NAME = 'TestClass';
    const cn1Wrapper = shallow(<Button {...props} />);
    const cn2Wrapper = shallow(<Button {...props} className={CLASS_NAME} />);

    expect(cn1Wrapper.find('.Button').hasClass(CLASS_NAME)).toEqual(false);
    expect(cn2Wrapper.find('.Button').hasClass(CLASS_NAME)).toEqual(true);
  });
});

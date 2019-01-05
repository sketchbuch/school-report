//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import Button from './Button';

describe('<Button />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<Button />, div);
  });

  test('Handles busy property', () => {
    const props = {
      busy: true,
    };
    const wrapper = mount(<Button {...props} />);
    expect(wrapper.find('.icofont-refresh')).toHaveLength(1);
  });

  test('Handles className property', () => {
    const cn1Props = { className: '' };
    const cn1Wrapper = shallow(<Button {...cn1Props} />);
    const cn2Props = { className: 'TestClass' };
    const cn2Wrapper = shallow(<Button {...cn2Props} />);

    expect(cn1Wrapper.find('.Button').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('.Button').hasClass('TestClass')).toEqual(true);
  });
});

//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import ButtonCircular from './ButtonCircular';

describe('<ButtonCircular />', () => {
  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonCircular />, div);
  });

  test('Handles visual property', () => {
    const props = {
      visual: true,
    };
    const wrapper = mount(<ButtonCircular {...props} />);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  test('Handles className property', () => {
    const cn1Props = { className: '' };
    const cn1Wrapper = shallow(<ButtonCircular {...cn1Props} />);
    const cn2Props = { className: 'TestClass' };
    const cn2Wrapper = shallow(<ButtonCircular {...cn2Props} />);

    expect(cn1Wrapper.find('.ButtonCircular').hasClass('TestClass')).toEqual(false);
    expect(cn2Wrapper.find('.ButtonCircular').hasClass('TestClass')).toEqual(true);
  });
});

//@flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount } from 'enzyme';
import ButtonCircular from './ButtonCircular';
import type { Props } from './ButtonCircular';

describe('<ButtonCircular />', () => {
  const props: Props = {
    action: 'test',
    className: '',
  };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<ButtonCircular {...props} />, div);
  });

  test('Handles visual property', () => {
    const wrapper = mount(<ButtonCircular {...props} visual />);
    expect(wrapper.find('button')).toHaveLength(0);
  });

  test('Handles className property', () => {
    const CLASS_NAME = 'TestClass';
    const cn1Wrapper = shallow(<ButtonCircular {...props} />);
    const cn2Wrapper = shallow(<ButtonCircular {...props} className={CLASS_NAME} />);

    expect(cn1Wrapper.find('.ButtonCircular').hasClass(CLASS_NAME)).toEqual(false);
    expect(cn2Wrapper.find('.ButtonCircular').hasClass(CLASS_NAME)).toEqual(true);
  });
});

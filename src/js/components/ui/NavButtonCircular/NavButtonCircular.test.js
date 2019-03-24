//@flow

import React from 'react';
import { shallow } from 'enzyme';
import NavButtonCircular from './NavButtonCircular';
import type { Props } from './NavButtonCircular';

describe('<NavButtonCircular />', () => {
  const props: Props = { action: 'test', className: '', to: '/classes' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<NavButtonCircular {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Handles className property', () => {
    const TEST_CLASS = 'TestClass';
    const cn1Wrapper = shallow(<NavButtonCircular {...props} to="/classes" />);
    const cn2Wrapper = shallow(<NavButtonCircular {...props} className={TEST_CLASS} to="/classes" />);

    expect(cn1Wrapper.find('Link').hasClass(TEST_CLASS)).toEqual(false);
    expect(cn2Wrapper.find('Link').hasClass(TEST_CLASS)).toEqual(true);
  });
});

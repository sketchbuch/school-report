// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormHeader from './FormHeader';
import type { Props } from './FormHeader';

describe('<FormHeader />', () => {
  const CHILDREN: string = 'Test 2';
  const props: Props = {
    text: 'Test',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FormHeader {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders title', () => {
    const wrapper = shallow(<FormHeader {...props} />);
    expect(wrapper.text()).toBe(props.text);
  });

  test('Renders children', () => {
    const wrapper = shallow(<FormHeader>{CHILDREN}</FormHeader>);
    expect(wrapper.text()).toBe(CHILDREN);
  });

  test('Renders title in preference to children', () => {
    const wrapper = shallow(<FormHeader {...props}>{CHILDREN}</FormHeader>);
    expect(wrapper.text()).toBe(props.text);
    expect(wrapper.text()).not.toBe(CHILDREN);
  });
});

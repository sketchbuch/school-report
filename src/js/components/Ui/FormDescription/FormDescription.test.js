// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormDescription from './FormDescription';
import type { Props } from './FormDescription';

describe('<FormDescription />', () => {
  const CHILDREN: string = 'Test 2';
  const props: Props = {
    inline: false,
    text: 'Test',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FormDescription {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders title', () => {
    const wrapper = shallow(<FormDescription {...props} />);
    expect(wrapper.text()).toBe(props.text);
  });

  test('Renders children', () => {
    const wrapper = shallow(<FormDescription>{CHILDREN}</FormDescription>);
    expect(wrapper.text()).toBe(CHILDREN);
  });

  test('Renders title in preference to children', () => {
    const wrapper = shallow(<FormDescription {...props}>{CHILDREN}</FormDescription>);
    expect(wrapper.text()).toBe(props.text);
    expect(wrapper.text()).not.toBe(CHILDREN);
  });

  test('inline prop adds class', () => {
    const CLASS: string = '.FormDescription--inline';
    const wrapper = shallow(<FormDescription {...props} />);
    const wrapper2 = shallow(<FormDescription {...props} inline />);
    expect(wrapper.find(CLASS)).toHaveLength(0);
    expect(wrapper2.find(CLASS)).toHaveLength(1);
  });
});

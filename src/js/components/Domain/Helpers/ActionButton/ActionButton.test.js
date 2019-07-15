// @flow

import React from 'react';
import { shallow } from 'enzyme';
import ActionButton from './ActionButton';
import type { Props } from './ActionButton';

describe('<ActionButton />', () => {
  const props: Props = {
    domainType: 'category',
    title: 'Test',
    to: '/test',
    type: 'add',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<ActionButton {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test(`"action" prop is rendered correctly"`, () => {
    const wrapper = shallow(<ActionButton {...props} />);
    const navBtnProps = wrapper.find('NavButtonCircular').props();
    expect(navBtnProps.action).toBe(`${props.type}-${props.domainType}`);
  });

  test('"iconType" prop is "plus" if type is "add"', () => {
    const wrapper = shallow(<ActionButton {...props} />);
    const iconProps = wrapper.find('Icon').props();
    expect(iconProps.type).toBe('plus');
  });

  test('"iconType" prop is "trash" if type is "delete"', () => {
    const wrapper = shallow(<ActionButton {...props} type="delete" />);
    const iconProps = wrapper.find('Icon').props();
    expect(iconProps.type).toBe('trash');
  });
});

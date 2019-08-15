// @flow

import React from 'react';
import { shallow } from 'enzyme';
import FormCancel from './FormCancel';
import type { Props } from './FormCancel';

describe('<FormCancel />', () => {
  const props: Props = {
    name: 'Name',
    ns: 'Ns',
    to: '/somewhere',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<FormCancel {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders a Link', () => {
    const wrapper = shallow(<FormCancel {...props} />);
    const link = wrapper.find('Link');
    expect(link).toHaveLength(1);
    expect(link.prop('to')).toBe(props.to);
  });

  test('Renders a Translation', () => {
    const wrapper = shallow(<FormCancel {...props} />);
    const translation = wrapper.find('Translation');
    expect(translation).toHaveLength(1);
    expect(translation.prop('name')).toBe(props.name);
    expect(translation.prop('ns')).toBe(props.ns);
  });
});

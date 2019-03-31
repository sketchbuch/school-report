// @flow

import React from 'react';
import { shallow } from 'enzyme';
import Alert, { alertIcons } from './Alert';
import type { AlertTypes, Props } from './Alert';

const testIcon = (iconType: AlertTypes, props: Props): void => {
  test('Renders ' + iconType + ' icon', () => {
    const wrapper = shallow(<Alert {...props} type={iconType} />);
    const icon = wrapper.find('Icon');
    expect(icon).toHaveLength(1);
    expect(icon.props().type).toBe(alertIcons[iconType]);
  });
};

describe('<Alert />', () => {
  const props: Props = {
    body: 'The body',
    icon: true,
    title: 'The title',
    type: 'success',
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<Alert {...props} />);
    expect(wrapper).toHaveLength(1);
  });

  test('Renders without an icon if !icon', () => {
    const wrapper = shallow(<Alert {...props} type="warn" icon={false} />);
    expect(wrapper.find('Icon')).toHaveLength(0);
  });

  test('Renders with an icon if icon', () => {
    const wrapper = shallow(<Alert {...props} type="warn" />);
    expect(wrapper.find('Icon')).toHaveLength(1);
  });

  testIcon('warn', props);
  testIcon('info', props);
  testIcon('success', props);
  testIcon('error', props);
});

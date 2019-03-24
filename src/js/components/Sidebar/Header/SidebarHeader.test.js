// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarHeader from './SidebarHeader';

describe('<SidebarHeader />', () => {
  const props = { title: 'Test title', subtitle: '' };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarHeader />);
    expect(wrapper).toHaveLength(1);
  });

  test('Subtitle not displayed if not supplied', () => {
    const wrapper = shallow(<SidebarHeader {...props} />);
    const headline = wrapper.find('h1');
    expect(headline).toHaveLength(1);
    expect(headline.find('span')).toHaveLength(0);
  });

  test('Subtitle not displayed if not supplied', () => {
    const wrapper = shallow(<SidebarHeader {...props} subtitle="Test" />);
    const headline = wrapper.find('h1');
    expect(headline).toHaveLength(1);
    expect(headline.find('span')).toHaveLength(1);
  });
});

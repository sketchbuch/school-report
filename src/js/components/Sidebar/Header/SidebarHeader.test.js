// @flow

import React from 'react';
import ReactDOM from 'react-dom';
import { shallow } from 'enzyme';
import SidebarHeader from './SidebarHeader';

describe('<SidebarHeader />', () => {
  const props = { title: 'Test title', subtitle: '' };

  test('Renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<SidebarHeader {...props} />, div);
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

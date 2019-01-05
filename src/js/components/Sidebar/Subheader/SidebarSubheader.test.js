// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarSubheader from './SidebarSubheader';

describe('<SidebarSubheader />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarSubheader />);
    expect(wrapper).toHaveLength(1);
  });
});

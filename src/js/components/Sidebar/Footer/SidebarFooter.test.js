// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarFooter from './SidebarFooter';

describe('<SidebarFooter />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarFooter />);
    expect(wrapper).toHaveLength(1);
  });
});

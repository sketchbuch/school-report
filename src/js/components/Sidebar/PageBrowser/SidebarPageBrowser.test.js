// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarPageBrowser from './SidebarPageBrowser';


describe('<SidebarPageBrowser />', () => {
  const props = {};
  
  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarPageBrowser {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

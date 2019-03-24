// @flow

import React from 'react';
import { shallow } from 'enzyme';
import SidebarInner from './SidebarInner';

describe('<SidebarInner />', () => {
  test('Renders without crashing', () => {
    const props = {
      description: '',
      icon: '',
      id: '',
      label: '',
      link: '',
      linkEdit: '',
      onClick: null,
    };

    const wrapper = shallow(<SidebarInner {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SidebarInner from './SidebarInner';

configure({ adapter: new Adapter() });

describe('<SidebarInner />', () => {
  test('Renders without crashing', () => {
    const props = {
      description: '',
      icon: '',
      label: '',
      link: '',
      linkEdit: '',
      onClick: null,
    };

    const wrapper = shallow(<SidebarInner {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

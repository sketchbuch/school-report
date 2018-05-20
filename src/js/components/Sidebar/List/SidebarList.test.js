// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SidebarList from './SidebarList';

configure({ adapter: new Adapter() });

describe('<SidebarList />', () => {
  const props = {
    dispatch: jest.fn(),
    items: [],
    listType: 'class',
    noItemsTxt: 'No items in list',
    sortOrder: ['created'],
  };

  test('Renders without crashing', () => {
    const wrapper = shallow(<SidebarList {...props} />);
    expect(wrapper).toHaveLength(1);
  });
});

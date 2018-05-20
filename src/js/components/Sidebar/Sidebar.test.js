// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Sidebar from './Sidebar';

configure({ adapter: new Adapter() });

describe('<Sidebar />', () => {
  test('Renders without crashing', () => {
    const wrapper = shallow(<Sidebar />);
    expect(wrapper).toHaveLength(1);
  });
});

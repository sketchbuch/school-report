// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Menu from './Menu';

configure({ adapter: new Adapter() });

test('<Menu />: Renders without crashing', () => {
  const wrapper = shallow(<Menu />);
  expect(wrapper).toHaveLength(1);
});

// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderTitle from './HeaderTitle';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

test('<HeaderTitle />: Renders without crashing', () => {
  const wrapper = shallow(<HeaderTitle />);
  expect(wrapper).toHaveLength(1);
});

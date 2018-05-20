// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import HeaderBreadcrumb from './HeaderBreadcrumb';
import '../../Translation/testData';

configure({ adapter: new Adapter() });

test('<HeaderBreadcrumb />: Renders without crashing', () => {
  const props = {
    link: '/',
    text: 'A link',
  };
  const wrapper = shallow(<HeaderBreadcrumb {...props} />);
  expect(wrapper).toHaveLength(1);
});

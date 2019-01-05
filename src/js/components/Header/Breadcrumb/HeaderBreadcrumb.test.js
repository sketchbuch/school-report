// @flow

import React from 'react';
import { shallow } from 'enzyme';
import HeaderBreadcrumb from './HeaderBreadcrumb';

test('<HeaderBreadcrumb />: Renders without crashing', () => {
  const props = {
    link: '/',
    text: 'A link',
  };
  const wrapper = shallow(<HeaderBreadcrumb {...props} />);
  expect(wrapper).toHaveLength(1);
});

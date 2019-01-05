import React from 'react';
import { shallow } from 'enzyme';
import NotFound from './NotFound';

it('<NotFound /> - Renders without crashing', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toHaveLength(1);
});

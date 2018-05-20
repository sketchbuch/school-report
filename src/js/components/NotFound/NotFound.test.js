import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NotFound from './NotFound';

configure({ adapter: new Adapter() });

it('<NotFound /> - Renders without crashing', () => {
  const wrapper = shallow(<NotFound />);
  expect(wrapper).toHaveLength(1);
});

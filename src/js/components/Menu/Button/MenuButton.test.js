// @flow

import React from 'react';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MenuButton from './MenuButton';

configure({ adapter: new Adapter() });

test('<MenuButton />: Renders without crashing', () => {
  const wrapper = shallow(<MenuButton open={false} clickHandler={jest.fn()} />);
  expect(wrapper).toHaveLength(1);
});

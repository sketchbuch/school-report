// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import store from '../../../store/redux';
import HomeLayout from './HomeLayout';

configure({ adapter: new Adapter() });

test('<HomeLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><HomeLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});

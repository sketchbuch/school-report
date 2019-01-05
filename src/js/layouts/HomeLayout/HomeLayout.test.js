// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import HomeLayout from './HomeLayout';

test('<HomeLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><HomeLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});

// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import TextsLayout from './TextsLayout';

test('<TextsLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><TextsLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});

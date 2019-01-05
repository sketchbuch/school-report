// @flow

import React from 'react';
import { Provider } from 'react-redux';
import { shallow } from 'enzyme';
import store from '../../store/redux';
import PupilsLayout from './PupilsLayout';

test('<PupilsLayout />: Renders without crashing', () => {
  const wrapper = shallow(<Provider store={store}><PupilsLayout /></Provider>);
  expect(wrapper).toHaveLength(1);
});
